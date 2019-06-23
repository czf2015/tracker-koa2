const cp = require('child_process')

// Unix程序的cat命令，它会把输入的内容都复制一遍并打印出来
const cat = cp.spawn('cat') 

cat.stdout.on('data', data => {
    console.log(data.toString())
})

cat.on('exit', () => {
    console.log('exit')
})

cat.stdin.write('meow')

cat.stdin.end()