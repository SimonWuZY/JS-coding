function typeOf(obj){
    let res = Object.prototype.toString.call(obj).split(' ')[1]
    console.log(res)
    res = res.substring(0, res.length - 1).toLowerCase()
    return res
    // return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

console.log(typeOf(123)); // number
console.log(typeOf('hello')); // string
console.log(typeOf(true)); // boolean
console.log(typeOf(null)); // null
console.log(typeOf(undefined)); // undefined
console.log(typeOf({})); // object
console.log(typeOf([])); // array
console.log(typeOf(function(){})); // function
console.log(typeOf(new Date())); // date
console.log(typeOf(/abc/)); // regexp
console.log(typeOf(new Map())); // map
console.log(typeOf(new Set())); // set
console.log(typeOf(new WeakMap())); // weakmap