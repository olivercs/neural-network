import math from 'mathjs';
import Neuron from './Neuron';
import {sumArray} from './utils';

export default class Layer {

    constructor(inputSize, learningRate, Activation) {
        this.neurons = [];
        this.inputSize = inputSize;
        this.Activation = Activation;
        this.learningRate = learningRate;
    }

    addNeurons(num = 1) {
        while (num--) {
            this.addNeuron(this.inputSize, this.Activation, this.learningRate);
        }
    }

    addNeuron() {
        this.neurons.push(new Neuron(this.inputSize));
    }

    backPropagateError(errors) {

        if (errors.length != this.neurons.length) {
            throw new Error('# of errors and neurons MUST match.')
        }

        // Propagate the error throught all the neurons of this layer.

        const weightedErrors = errors.map((error, index) =>
            math.dotMultiply(this.neurons[index].weights, error));


        this.neurons.forEach((neuron, index) =>
            neuron.adjustWeights(this.lastInputs, errors[index]));

        return sumArray(weightedErrors);

    }

    predict(inputs) {
        this.lastInputs = inputs;
        return this.neurons.map(neuron => neuron.predict(inputs));
    }
}