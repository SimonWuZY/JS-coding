/**
 * 计算生成 n 个 's' 的最小体力
 * @param {number} n
 * @return {number}
 */
function minCostToProduceS(n) {
    if (n === 1) return 0;

    // dp[i] 表示生成 i 个字符的最小体力
    const dp = new Array(n + 1).fill(Infinity);
    dp[1] = 0;

    // 从 2 到 n 递推
    for (let i = 2; i <= n; i++) {
        // 枚举 i 的所有因数 j (j < i)
        for (let j = 1; j * j <= i; j++) {
            if (i % j === 0) {
                // j 是因数
                if (j < i) {
                    const pasteTimes = i / j - 1; // 需要粘贴次数
                    dp[i] = Math.min(dp[i], dp[j] + 2 + pasteTimes);
                }
                // 检查另一个因数 i/j
                const other = i / j;
                if (other !== j && other < i) {
                    const pasteTimes = i / other - 1;
                    dp[i] = Math.min(dp[i], dp[other] + 2 + pasteTimes);
                }
            }
        }
    }

    return dp[n];
}



// 测试
console.log(minCostToProduceS(1)); // 0
console.log(minCostToProduceS(2)); // 3
console.log(minCostToProduceS(3)); // 4
console.log(minCostToProduceS(4)); // 5
console.log(minCostToProduceS(6)); // 7