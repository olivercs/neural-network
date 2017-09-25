export default class Tanh {
    static func(weightedSum) {
        return Math.tanh(weightedSum);
    }
    static derivative(weightedSum) {
        return 1 - Math.pow(Tanh.func(weightedSum), 2);
    }
}