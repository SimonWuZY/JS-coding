// 简易版深拷贝
const deepCopy_easy = (obj = {}) => {
    let newObj = null;

    // 判断是否需要进行递归
    if(typeof obj === 'object' && obj !== null){
        newObj = obj instanceof Array ? [] : {};

        // 进行下一层递归克隆
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                newObj[key] = deepCopy(obj[key]);
            }
        }
    }
    // 如果不是对象或数组，直接返回原值
    else {
        newObj = obj;
    }
    return newObj;
}

// 要判断循环引用的 不然会爆栈 + 数据冗余
// 复杂版深拷贝 (考虑了循环引用) + 各种边界条件
const deepCopy_hard = (obj = {}, map = new Map()) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // 做循环引用的判断
    if (map.has(obj)) {
        return map.get(obj);
    }

    let newObj;

    // 处理特殊对象类型
    if (obj instanceof Date) {
        newObj = new Date(obj);
    } else if (obj instanceof RegExp) {
        newObj = new RegExp(obj.source, obj.flags);
    } else if (obj instanceof Map) {
        newObj = new Map();
        map.set(obj, newObj);
        obj.forEach((value, key) => {
            newObj.set(deepCopy_hard(key, map), deepCopy_hard(value, map));
        });
    } else if (obj instanceof Set) {
        newObj = new Set();
        map.set(obj, newObj);
        obj.forEach(value => {
            newObj.add(deepCopy_hard(value, map));
        });
    } else if (Array.isArray(obj)) {
        newObj = [];
        map.set(obj, newObj);
        for (let i = 0; i < obj.length; i++) {
            newObj[i] = deepCopy_hard(obj[i], map);
        }
    } else {
        newObj = {};
        map.set(obj, newObj);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = deepCopy_hard(obj[key], map);
            }
        }
    }

    return newObj;
};
