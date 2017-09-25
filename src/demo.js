
import Network from './Network.js';
import LossFunctions from './LossFunctions.js';

const network = new Network(2);

network.addLayer(6);
network.addLayer(1);

const trainingSet = [
  { inputs: [0, 0], expected: [0] },
  { inputs: [1, 0], expected: [0] },
  { inputs: [0, 1], expected: [0] },
  { inputs: [1, 1], expected: [1] }
];

network.train(trainingSet, 7000, 0.01);

console.log([0, 0], network.predict([0, 0]));
console.log([1, 0], network.predict([1, 0]));
console.log([0, 1], network.predict([0, 1]));
console.log([1, 1], network.predict([1, 1]));

console.log(network);