const arr = [1, [2, 3], [4, [5, 6]]];

// 方法一使用 reduce 实现扁平化
const myFlat1 = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myFlat1(cur) : cur);
    }, []);
};


console.log(myFlat1(arr));
