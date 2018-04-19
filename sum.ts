let sum = (x?: number) => {

    // the trick is to access inner from inside itself as `any` with `.sum` initialized to 0
    // we know that the reference will be initialized
    // we could certainly achieve the same effect by using `this.`
    // but scoping with `this` is not intuitive
    let inner: any;
    inner = (x1?: number) => {
        // need additional check for 0, e.g. calling sum(0)(1)(0)() is valid, same below
        if (x1 || x1 === 0) {
            inner.sum += x1;
            return inner;
        } else {
            return inner.sum;
        }
    }
    // a JS function is an object, we could dynamically add anything to it
    inner.sum = 0;

    // this is only for the first call sum(...)...()
    if (x || x === 0) {
        // if x is set, then we work with inner
        return inner(x);
    } else {
        // this is possible only when the fist call is sum();
        return 0;
    }
}

console.log('SUM: ', sum(1)(2)(0)(3)());

// run this as `ts-node sum.ts`
// if ts-node is not installed, run `npm i ts-node -g`