/*
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

 

示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：

输入：nums = [1]
输出：1
示例 3：

输入：nums = [5,4,-1,7,8]
输出：23
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 1. 求子数组 -> 前缀和
    // 很像买股票那个题 -> 当前前缀和 - 前面最小的前缀和 即为答案
    // let res = -Infinity, minPreSum = 0, CurpreSum = 0;
    // for(const x of nums){
    //     CurpreSum += x;
    //     res = Math.max(res, CurpreSum - minPreSum);
    //     minPreSum = Math.min(minPreSum, CurpreSum);
    // }
    // return res;

    // 2. dp 的写法
    // dp[i] 到当前下标的子数组能有的最大值
    const len = nums.length;
    const dp = [];
    dp[0] = nums[0];
    //nums[i] 单独组成一个子数组，那么 f[i]=nums[i]。
    // nums[i] 和前面的子数组拼起来，也就是在以 nums[i−1] 结尾的最大子数组和之后添加 nums[i]，那么 f[i]=f[i−1]+nums[i]。
    for(let i = 1; i < len; i++){
        // 算上当前数 or 保持原样
        dp[i] = Math.max(dp[i - 1], 0) + nums[i];
    }
    return Math.max(...dp);
};
