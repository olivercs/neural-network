import math from 'mathjs';

export function sumArray(array) {
  return array.reduce((sum, element) => math.add(sum, element));
}