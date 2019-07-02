process.on('exit', () => {
    setTimeout(() => {
        console.log('This will not run')
    }, 100)
    console.log('Bye!')
})

process.on('uncaughtException', err => {
    console.log(`Caught exception: ${err}`)
})

nonexistentFunc()