// 基础：
const add = x => x + 1;
const double = x => x * 2;

const pipe1 = (...Funs) => {
    return (x) =>
        Funs.reduce((acc, fun) => {
            return fun(acc);
        }, x);
}

const piped1 = pipe1(add, double);
console.log(piped1(2));


// 升级：支持异步函数
const asyncSquare = async x => x ** 2;

const pipe2 = (...Funs) => {
    return (x) => {
        return Funs.reduce(async (acc, fun) => {
            return fun(await acc);
        }, Promise.resolve(x));
    }
}

const piped2 = pipe2(add, double, asyncSquare);
piped2(2).then(console.log); // 输出 16（(2+1)*2 → 6 → 6²=36）



/*
// 项目中出现过的Convex搜索功能需要类型安全
type SearchResult<T> = {
    data: T[];
    total: number;
    highlight: { [K in keyof T]?: string[] };
    good: boolean
    time: number
    ...more props...
  };
  
  // 问题：如何为这个类型添加分页参数pageSize,pageNum，并保持所有字段可选除了data？
  type PaginatedSearchResult<T> = */