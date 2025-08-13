/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
    // 好题 值得仔细推敲
    // 没有能量的笔试题
    if (n === 1)
        return 0;
    // dp[i] 表示到达 i 个字母时需要的操作次数
    const dp = Array(n + 1).fill(0);
    dp[0] = 0, dp[1] = 0;
    for (let i = 2; i < n + 1; i++) {
        // dp[i] 从某个 dp[j] 转移而来 
        // dp[i] -> j + k * j = i
        // 所以得出 i % j === 0 => j 一定是 i 的因数
        dp[i] = Infinity;
        for (let j = 1; j * j <= i; j++) {
            if (i % j === 0) {
                // 如果想到两种 -> 因为一个数有因数 j 必然有因数 i / j
                // dp[j] 表示有 j 个字母时的操作 + 再执行 i/j 次复制操作
                dp[i] = Math.min(dp[i], Math.floor(dp[j] + i / j));
                // dp[i/j] 表示已经有 i/j 个字母时的操作 + 再执行 j 次复制操作
                dp[i] = Math.min(dp[i], Math.floor(dp[i / j] + j));
            }
        }
    }
    return dp[n];
};