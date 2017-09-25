import math from 'mathjs';
import {sumArray} from './utils';
import LossFunctions from './LossFunctions';
import Layer from './Layer';

export default class Network {

    constructor(inputSize, learningRate, Activation, lossFunction = LossFunctions.SquaredErrors) {
        this.layers = [];
        this.inputSize = inputSize;
        this.lossFunction = lossFunction;
        this.learningRate = learningRate;
        this.Activation = Activation;
    }

    addLayer(numNeurons) {
        let inputSize = this.inputSize;

        if (this.layers.length) {
            // if we have multiple layer, set the inputSize to the number of 
            // neurons of last layer.
            inputSize = this.layers[this.layers.length - 1].neurons.length;
        }

        const layer = new Layer(inputSize, this.learningRate, this.Activation);

        layer.addNeurons(numNeurons);
        this.layers.push(layer);
        this.reversedLayers = [...this.layers].reverse();
    }

    train(trainingSet, epoch = 100, targetMSE = 0.01) {

        if (!trainingSet) {
            throw new Error('trainingSet cannot be null/undefined.');
        }

        for (let count = 0; count < epoch; count++) {

            // SumSquaredErrors Set.
            const results = trainingSet.map(training => this.trainSingleSample(training));

            const squaredErrorSet = results.map(({ predicted, expected }) => {
                return predicted.map((_predicted, index) => {
                    return this.lossFunction(_predicted, expected[index]);
                });
            });

            const sumSquaredErrors = sumArray(squaredErrorSet);

            if (sumSquaredErrors.every(error => (error) < targetMSE) || epoch <= 0) {
                console.log('Epoch left:', epoch - count);
                console.log('Accumulative Errors:', sumSquaredErrors);
                break;
            }
        }
    }

    trainSingleSample({ expected, inputs }) {

        const predicted = this.predict(inputs);

        const networkError = math.subtract(expected, predicted);

        this.reversedLayers.reduce((error, layer) =>
            layer.backPropagateError(error), networkError);

        return { predicted, expected };

    }

    predict(inputs) {
        return this.layers.reduce((lastInputs, layer) =>
            layer.predict(lastInputs), inputs);
    }
}