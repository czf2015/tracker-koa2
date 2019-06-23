const cp = require('child_process')

// 默认配置--可选
const options = {
    encoding: 'utf8', // I/O流输入字符的编码格式
    timeout: 500, // 进程运行的时间
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false, // 是否创建Node子进程的新会话
    cwd: null, // null表示使用当前的进程工作目录
    env: null, // null表示shi'y
}

cp.exec('for i in {1..100000};do echo $i;done', options, (err, stdout, stderr) => {
    if (!err) {
        console.log(stdout)
        console.log(stderr)
    } else {
        console.error(err)
    }  
})