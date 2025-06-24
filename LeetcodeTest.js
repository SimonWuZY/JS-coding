// 3443. K 次修改后的最大曼哈顿距离
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(s, k) {
    // 把较小的 N / S 和 W / E 改成较大的那个
    // 记录 N S W E 的出现个数
    // 因为题目要求是移动过程中的曼哈顿最大值 所以要在遍历过程中做计算 
    let countN = 0, countS = 0, countW = 0, countE = 0;
    let res = 0;
    for(const str of s){
        if(str === 'N')
            countN++;
        else if(str === 'S')
            countS++;
        else if(str === 'W')
            countW++;
        else if(str === 'E')
            countE++;

        // 相当于每次走一格都重新计算下状态
        const countDir = (drt1, drt2, times) => {
            return Math.abs(drt1 - drt2) + times * 2; 
        };

        // 修改方向
        const times1 = Math.min(countN, countS, k);
        const times2 = Math.min(countW, countE, k - times1);
        
        res = Math.max(res, countDir(countN, countS, times1) + countDir(countW, countE, times2));
    }

    return res;
};

let s = "SN";
let k = 0;
console.log(maxDistance(s, k));
