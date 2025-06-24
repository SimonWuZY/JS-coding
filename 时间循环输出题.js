// 第一题
// console.log("script start")
// setTimeout(()=>{
//     console.log("settimeout1")
// },0)
// let pro = new Promise(res=>{
//     console.log("promise1")
//     setTimeout(()=>{
//         console.log("settimeout2")
//     },0)
//     res("promise2")
// })
// pro.then(res=>{
//     console.log(res)
//     setTimeout(()=>{
//         console.log("settimeout3")
//     },0)
// })
// console.log("script end")

/*
script start
promise1
script end
promise2
settimeout1
settimeout2
settimeout3
*/

// 第二题
// console.log("script start")
// setTimeout(()=>{
//     console.log("settimeout1")
// },0)
// let pro = new Promise(res=>{
//     console.log("promise1")
//     res("promise2")
// })
// let pro3 = new Promise(res=>{
//     console.log("promise3")
//     res("promise4")
// })
// pro.then(res=>{
//     console.log(res)
//     setTimeout(()=>{
//         console.log("settimeout3")
//         pro3.then(res=>{
//             console.log(res)
//         })
//     },0)
// })
// console.log("script end")

/*
start
promise1
promise3
end
promise2
settimeout1
settimeout3
promise4
*/

// 第三题
// console.log("script start")
// setTimeout(()=>{
//     console.log("settimeout1")
//     pro3.then(res=>{
//         console.log(res)
//     })
// },0)
// let pro = new Promise(res=>{
//     console.log("promise1")
//     res("promise2")
// })
// let pro3 = new Promise(res=>{
//     console.log("promise3")
//     res("promise4")
// })
// pro.then(res=>{
//     console.log(res)
//     setTimeout(()=>{
//         console.log("settimeout3")
//     },0)
// })
// console.log("script end")

/*
start
promise1
promise3
end
promise2
settimeout1
promise4
settimeout3
*/


// 第四题
// let pro = ()=>{
//     new Promise(res=>{
//         res(5)
//     })
//     pro().then(res1=>{
//         console.log(res1)
//     })
// }
// pro().then(res2=>{
//     console.log(res2)
// })

// 答案是栈溢出
// 微任务在遇到内部事件循环的时候会出现栈溢出的现象，因为微任务只有执行到任务的"}"时，才会将任务的内存释放，
// 如果内部循环，则内存会无法释放导致溢出
// pro 函数没有返回 一直在递归调用 pro

// 第五题
// let pro = res => {
//     setTimeout(() => {
//         console.log(res)
//         pro(5)
//     }, 0)
// }
// pro(5)

// 一直输出 5
// 宏任务和微任务不同，他是执行完立马会出队列，而不需要一定要走到最后的“}，因此不存在栈溢出。
/*
“走到最后的 }”就是指函数体执行完毕，当前函数的调用栈帧被销毁。
只有这样，内存才会被释放，递归才不会导致栈溢出。
而微任务递归时，如果在同步代码里不断递归，永远走不到“最后的 }”，栈就会一直增长，最终溢出。
*/


// 第六题
// async function async1() {
//     console.log("async1 start");
//     await async2();
//     console.log("async1 end");
//     setTimeout(() => {
//         console.log('timer1')
//     }, 0)
// }
// async function async2() {
//     setTimeout(() => {
//         console.log('timer2')
//     }, 0)
//     console.log("async2");
// }
// async1();
// setTimeout(() => {
//     console.log('timer3')
// }, 0)
// console.log("start")

/*
async1 start
async2
start
async1 end
timer2
timer3
timer1
*/

/*
注意：async包裹的函数可以当作同步代码执行，直到遇到await跳出，执行函数外部的同步代码async2和外部的console.log，再跳回执行await后的同步代码，最后根据压入任务队列的顺序执行宏任务
额外注意的是：
async包裹的函数fn()，使用await接收时不一定需要fn()具有return。
如果函数定义return则返回return的输出，不然async语法会默认返回一个undefined，也就是async+await的函数一定会有返回值，其promise的状态只有fulfilled和rejected两种，不存在pending。
为什么需要注意这一点是因为，await接收的函数只有存在返回值的情况下才会执行后续的代码，不然会进行截断，代码会在await处结束。具体见下例。
*/

// 第七题
// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1')
//         // resolve()
//         // 不带resolve 则不会返回 则不会执行后续的代码
//     })
//     console.log('async1 success');
//     return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

/*
script start
script end
async1 start1
promise1
async1 success
async1 end
唉大错特错了 */

/*
标准答案:
srcipt start
async1 start
promise1
srcipt end
*/

/*
如果await后跟随的是async声明的函数，则一定会继续async1 success和async1 end，
但因为new Promise没有resolve，所以后续代码无法继续执行。
回应上一题的 await接收的函数只有存在返回值的情况下才会执行后续的代码，不然会进行截断，代码会在await处结束。
*/

// 第八题
async function async1() {
    console.log('async1 start');
    await new Promise(resolve => {
        console.log('promise1')
        resolve()//更改代码 promise 会返回 所以 await 不会被截断
    })
    console.log('async1 success');
    return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')

/*
script start
async1 start
promise1
script end
async1 success
async1 end
*/