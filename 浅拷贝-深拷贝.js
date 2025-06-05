const shallClone = (target) => {
    if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) { // 遍历对象自身可枚举属性（不考虑继承属性和原型对象）
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

const obj = {
    name: '张三',
    age: 18,
    info: {
        gender: '男'
    }
}

const cloneObj = shallClone(obj);

cloneObj.info.gender = '女';

console.log(cloneObj);
console.log(obj);

