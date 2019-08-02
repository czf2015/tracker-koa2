export function approxEqual(n1, n2, epsilon = 0.0001) {
    return Math.abs(n1 - n2) < epsilon
}

export function sum(...args) {
    return args.reduce((a, b) => a + b)
}