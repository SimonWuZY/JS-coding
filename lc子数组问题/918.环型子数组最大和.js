/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function(nums) {
    // 不是单调的就不能双指针吧
    // 两种情况分类讨论:
    // 1. 子数组没有跨越边界在 Nums 内部 (53题 最大子数组)
    // 2. 子数组跨越了边界 所以找 Nums 内部的最小子数组 sum(nums) - minS
    // 最后分类讨论比较结果即可
    
    // 求没有越界的最大子数组 和 最小子数组
    let minSubNum = 0; maxSubNum = -Infinity, minPreSum = 0, maxPreSum = -Infinity, CurPreSum = 0;
    for(const x of nums){
        CurPreSum += x;
        // 情况 1
        maxSubNum = Math.max(maxSubNum, CurPreSum - minPreSum);
        minPreSum = Math.min(minPreSum, CurPreSum);
        // 情况 2
        minSubNum = Math.min(minSubNum, CurPreSum - maxPreSum);
        maxPreSum = Math.max(maxPreSum, CurPreSum);
    }
    const sum = nums.reduce((a, b) => a + b, 0);
    return Math.max(sum - minSubNum, maxSubNum);
};