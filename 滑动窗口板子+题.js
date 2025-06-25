// 滑动窗口框架

/*
let left = 0, right = 0;

while (right < s.size()) {
    // 增大窗口
    window.add(s[right]);
    right++;

    while (window needs shrink) {
        // 缩小窗口
        window.remove(s[left]);
        left++;
    }
}
*/

// LCR 180. 文件组合
/*
待传输文件被切分成多个部分，按照原排列顺序，每部分文件编号均为一个 正整数（至少含有两个文件）。
传输要求为：连续文件编号总和为接收方指定数字 target 的所有文件。请返回所有符合该要求的文件传输组合列表。

注意，返回时需遵循以下规则：

每种组合按照文件编号 升序 排列；
不同组合按照第一个文件编号 升序 排列。

输入：target = 12
输出：[[3, 4, 5]]
解释：在上述示例中，存在一个连续正整数序列的和为 12，为 [3, 4, 5]。

输入：target = 18
输出：[[3,4,5,6],[5,6,7]]
解释：在上述示例中，存在两个连续正整数序列的和分别为 18，分别为 [3, 4, 5, 6] 和 [5, 6, 7]。
*/

/**
 * @param {number} target
 * @return {number[][]}
 */
var fileCombination = function(target) {
    let left = 1, right = 2, sum = 3;
    const res = [];
    while(left < right){
        if(sum === target){
            const ans = Array(right - left + 1).fill(0).map((x, index) => left + index);
            res.push([...ans]);
            // 等于的情况 可以继续窗口往右探索 同时减小左边 
            sum = sum - left;
            left++;
        }
        else if(sum > target){
            // 窗口值过大 缩小窗口 
            sum = sum - left;
            left++;
        }
        else{
            // 窗口值过小 扩大窗口
            right++;
            sum += right;
        }
    }
    return res;
};

target = 12;
console.log(fileCombination(target));