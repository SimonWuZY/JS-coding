const filePaths = ['/a/b/c', '/a/b/d', '/a/b/d/e/f'];

/*
fileTree = {
    name: 'a',
    children: [
    {
        name: 'b',
        children: [
        {
            name: 'c',
        },
        {
            name: 'd',
            children: [
            {
                name: 'e',
                children: [
                {
                    name: 'f',
                }]
            }]
        }],
    }],
}
*/

const fileBuildTree = (filePaths) => {
    const root = { name: '', children: [] };
    for (const file of filePaths) {
        // 去掉第一个空值
        const parts = file.split('/').filter(part => part !== '');

        let currentNode = root;
        for (const part of parts) {
            // 查找是否有对应的孩子节点的分支
            let childNode = currentNode.children.find(child => child.name === part);

            // 因为是按顺序从上往下找
            // 所以找不到就向 tree 中挂在整个分支
            // 找到了就继续往下找
            if (!childNode) {
                childNode = { name: part, children: [] };
                currentNode.children.push(childNode);
            }

            // 更新目前的分支
            currentNode = childNode;
        }
    }
    return root.children.length === 1 ? root.children[0] : root;
}

const fileTree = fileBuildTree(filePaths);
console.log(fileTree);
