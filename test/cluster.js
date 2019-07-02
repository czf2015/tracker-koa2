const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

const rssWarn = 12 * 1024 * 1024
const heapWarn = 10 * 1024 * 1024
const INTERVAL = 1000

const workers = {}

if (cluster.isMaster) {
    // 创建工作进程
    for (let i = 0; i < numCPUs; i++) {
        createWorker()
    }

    setInterval(() => {
        const time = new Date().getTime()
        for (pid in workers) {
            if (workers.hasOwnProperty(pid) && workers[pid].lastCallback + 5 * INTERVAL < time) {
                console.log(`Long running worker ${pid} killed`)
                workers[pid].worker.kill()
                delete workers[pid]
                createWorker()
            }
        }
    }, INTERVAL)

    // 出现死亡进程时重新开启新的进程
    cluster.on('death', worker => {
        console.log(`${worker} ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    // 工作进程创建http 服务器
    http.Server((req, res) => {
        // 模拟超时
        if (Math.floor(Math.random() * 100) === 1) {
            console.log(`Stopped ${process.pid} from ever finishing`)
            while (true) {
                continue
            }
        }
        res.writeHead(200)
        res.end(`hello world from ${process.pid}\n`)
    }).listen(8000)
    // 每秒报告一次状态
    setInterval(() => {
        process.send({
            cmd: 'reportMem',
            memory: process.memoryUsage(),
            process: process.pid
        })
    }, INTERVAL)
}

function createWorker() {
    const worker = cluster.fork()
    console.log(`Created worker: ${worker.process.pid}`)
    workers[worker.process.pid] = {
        worker,
        lastCallback: new Date().getTime() - INTERVAL
    }
    // 通过消息传递来监控工作进程状态
    worker.on('message', msg => {
        if (msg.cmd === 'reportMem') {
            workers[msg.process].lastCallback = new Date().getTime()
            if (msg.memory.rss > rssWarn) {
                console.log(`Worker ${msg.process} using too much memory`)
            }
        }
    })
}
