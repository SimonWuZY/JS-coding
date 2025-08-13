/**
 * 检测有向图中是否存在环
 * @param {Object} graph - 邻接表表示的图
 * @return {boolean} - 是否有环
 */
function hasCycle(graph) {
    const states = {};

    // 初始化所有节点状态为 0（未访问）
    for (const node in graph) {
        states[node] = 0;
    }

    function dfs(node) {
        states[node] = 1; // 标记为正在访问

        // 遍历邻居
        for (const neighbor of graph[node]) {
            if (states[neighbor] === 0) {
                if (dfs(neighbor)) return true;
            } else if (states[neighbor] === 1) {
                // 发现后向边，存在环
                return true;
            }
        }

        states[node] = 2; // 标记为已完成
        return false;
    }

    // 对每个未访问的节点进行DFS
    for (const node in graph) {
        if (states[node] === 0) {
            if (dfs(node)) return true;
        }
    }

    return false;
}

// 测试用例
const graph = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['D'],
    D: ['A'] // 形成环 A->B->D->A
};

const graphNoCycle = {
    A: ['B', 'C'],
    B: ['D'],
    C: [],
    D: []
};

console.log('graph 有环:', hasCycle(graph));        // true
console.log('graphNoCycle 无环:', hasCycle(graphNoCycle)); // false