/**
 * 全局异常捕捉
 *    异步异常捕捉
 *      1. 函数需要返回一个Promise
 *      2. 调用方async await try
 */

func1()

async function func1() {
    try{
        await func2()
    } catch(err) {
        console.log(err)
    }
}

function func2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const r = Math.random()
            if(r < 0.5) {
                reject('error async')
            }
        })
    })
}

