// try{
//     setTimeout(() => {
//         throw new Error('123');
//     }, 100)
// }catch(e){
//     console.log('---', e.msg);
// }
/*
function delay(fn, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // fn 里面报错即卡死了
            resolve(fn());
        }, ms);
    });
}

async function run() {
    try {
        await delay(() => {
            throw new Error("异步错误");
        }, 1000);
    } catch (err) {
        console.log("捕获到:", err);
    }
}*/

function delay(fn, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // fn 在这里报错
                // 被同步的 try catch 捕获到
                // 然后调用 reject 把 Promise 变为 REJECTED
                const result = fn();
                resolve(result);
            } catch (err) {
                console.log('reject捕获');
                reject(err);
            }
        }, ms);
    });
}

async function run() {
    try {
        // 这里 await Promise 变为 REJECTED
        // 同步的 try catch 捕获到
        await delay(() => {
            throw new Error("出错了");
        }, 1000);
    } catch (err) {
        console.log("捕获到:", err.message);
    }
}
run()

console.log('123');