export default class LossFunctions {
  // Error Sum of Squares
  static SquaredErrors(predicted, expected) {
    return Math.pow((expected - predicted), 2);
  }
}
