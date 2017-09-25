export default class Sigmoid {
    static func(weightedSum) {
        return 1 / (1 + Math.exp(-1 * weightedSum));
    }
    static derivative(weightedSum) {
        return Sigmoid.func(weightedSum) * (1 - Sigmoid.func(weightedSum))
    }
}