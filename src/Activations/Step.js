export default class Step {
    static func(weightedSum, threshold) {
        return Number(weightedSum > threshold);
    }
    static derivative() {
        return 1;
    }
}