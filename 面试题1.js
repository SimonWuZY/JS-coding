/*
可以购买月卡或者直接买原石：
1. 花 30r 购买一张月卡，可以马上获得 300 原石 同时在接下来的 30 天每天获得 90 原石
2. 可以在任意天以1: 10 的购买力购买任意数量原石
输入: n 表示需要的原石数；m 表示经历的天数
输出: 最少的钱数

示例: 
输入: n = 3200, m = 35
输出: 50
*/

/*
这个问题是一个典型的最优化问题，目标是在给定天数 m 内，以最少的金钱 cost 获得至少 n 个原石。我们有两种获取原石的方式：

算法步骤
初始化 minCost 为 Infinity。
确定 k 的枚举范围。k 可以从 0 开始，上限 maxK 可以设为 Math.floor(m / 30) + Math.ceil(n / 300) + 1 或一个宽松的值如 Math.ceil(n / 300) + 10。
3. 对于每个 k 从 0 到 maxK：
* 计算购买 k 张月卡的成本 cardCost = k * 30。
* 计算 k 张月卡能提供的总原石数 totalCardStones：
* 立即获得: k * 300
* 每日奖励天数: claimDays = Math.min(m, 30 * k) （实际能领取奖励的天数）
* 每日奖励总量: 90 * claimDays
* totalCardStones = k * 300 + 90 * claimDays
* 计算还需多少原石: remaining = Math.max(0, n - totalCardStones)
* 计算直接购买成本: directCost = Math.ceil(remaining / 10)
* 计算该 k 下的总成本: totalCost = cardCost + directCost
* 更新 minCost = Math.min(minCost, totalCost)
4. 返回 minCost。
*/

function minCostToGetStones(n, m) {
    let minCost = Infinity;

    // 枚举购买月卡的数量 k
    // k=0 表示不买月卡
    // k 的上限：考虑到 m 天最多能用掉 m/30 张卡的资格，加上 n/300 的初始石头需求
    const maxK = Math.ceil(n / 300);

    for (let k = 0; k <= maxK; k++) {
        const cardCost = k * 30; // 购买 k 张月卡的花费

        // 计算 k 张月卡能提供的总原石
        const immediateStones = k * 300; // 立即获得的原石
        const claimDays = Math.min(m, 30 * k); // 在 m 天内，能领取每日奖励的实际天数
        const dailyStones = 90 * claimDays; // 每日奖励获得的原石
        const totalCardStones = immediateStones + dailyStones;

        // 计算还需要多少原石
        const remainingStones = Math.max(0, n - totalCardStones);
        // 计算直接购买这些原石的花费 (1元换10原石)
        const directCost = Math.ceil(remainingStones / 10);

        const totalCost = cardCost + directCost;
        minCost = Math.min(minCost, totalCost);
    }

    return minCost;
}

// 测试示例
console.log(minCostToGetStones(3200, 28)); // 输出: 50