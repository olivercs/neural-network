export default class Identity {
    static func(weightedSum, bias) {
        return weightedSum + bias;
    }
    static derivative() {
        return 1;
    }
}