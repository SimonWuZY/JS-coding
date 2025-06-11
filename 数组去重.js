// ES5 实现
function uniqueES5(arr) {
    var res = arr.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

// ES6 实现 直接用一个集合就好了
const uniqueES6 = arr => [...new Set(arr)];

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
console.log(uniqueES5(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(uniqueES6(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]