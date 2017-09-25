import math from 'mathjs';
import Sigmoid from './Activations/Sigmoid';

export default class Neuron {

    constructor(inputSize, learningRate = 0.1, Activation = Sigmoid, threshold = 0.5) {
        this.inputSize = inputSize;
        this.weights = math.dotMultiply(math.random([inputSize]), math.sqrt(2.0 / inputSize));
        this.Activation = Activation;
        this.learningRate = learningRate;
        this.threshold = threshold;
    }

    adjustWeights(inputs, error) {

        const weightedSum = math.dot(inputs, this.weights);
        const derivative = this.Activation.derivative(weightedSum);

        this.weights = this.weights.map((weight, index) => {
            return weight + this.learningRate * error * derivative * inputs[index];
        });

    }

    predict(inputs) {

        if (inputs.length != this.inputSize) {
            throw new Error(`Invalid number of inputs. Expected: ${this.inputSize}`);
        }

        const weightedSum = math.dot(inputs, this.weights);
        return this.Activation.func(weightedSum, this.threshold);

    }

}