const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

const _ = Symbol('_');

function curry (fun, ...preArgs){
    // console.log(preArgs);

    return (...newArgs) => {

        const Args = [...preArgs, ...newArgs];
        const AllArgs = Args.filter((x) => x !== _);
        
        if(AllArgs.length < fun.length){
            return curry(fun, ...AllArgs);
        }
        else{
            return fun(...AllArgs);
        }
    }
}

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1, _, 3)(2)); // 6