// 主要是解析 ? 和 & 后面的参数
// 有点复杂得多看看奥
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    console.log(paramsStr); // 输出 ? 后面的字符串
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    console.log(paramsArr); // 输出数组
    let paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); // 分割 key 和 value
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
    
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = val;
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true;
        }
    })
    
    return paramsObj;
}

const params = parseParam('http://www.baidu.com?a=1&b=2&c=3');
console.log(params); // { a: 1, b: 2, c: 3 }
