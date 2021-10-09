// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

// eslint-disable-next-line id-length
function getRandomPositiveInteger (a, b) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}
getRandomPositiveInteger();

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

// eslint-disable-next-line id-length
function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки
  return result.toFixed(digits);
}
getRandomPositiveFloat();

//Функция, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomIntInclusive(min, max) {
  //max <= min ? console.log('Ошибка. Введите значение большее, чем min.');
  if (max <= min) {
    // eslint-disable-next-line no-console
    console.log('Ошибка. Введите значение большее, чем min.');
  } else {
    min < 0 ? (min *= -1) : min;
    max < 0 ? (max *= -1) : max;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
}
getRandomIntInclusive();

//Функция, возвращающая число, округленное до указанного в  zeros количества знаков после запятой.
function rounding(num, zeros) {
  const factor = +(`1e${ zeros}`);
  return Math.round(num * factor) /factor;
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. decimalPlaces - количество знаков после запятой.
function getRandomArbitrary(min, max, decimalPlaces) {
  if (max <= min) {
    // eslint-disable-next-line no-console
    console.log('Ошибка. Введите значение большее, чем min.');
  }
  min < 0 ? (min *= -1) : min;
  max < 0 ? (max *= -1) : max;
  const result = Math.random() * (max - min) + min;
  return rounding(result, decimalPlaces);
}
getRandomArbitrary();

// функция принимающая массив и возвращающая случайный элемент этого массива.
/*const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];
getRandomArrayElement();*/

// функция, принимающая массив и возвращающая этот массив с удаленными из него повторяющимися элементами.
const getArrayWithUniqueElements = (array) => {
  const set = new Set(array);
  return array = Array.from(set);
};
getArrayWithUniqueElements();

// функция, возвращающая массив неповторяющихся двузначных номеров пользователей в рандомизированном порядке (для отображения аватара от 01 до 10).
const getUserNumbers = () => {
  const userNumbers = [];
  let arrayUserNumbers = [];
  let nonDuplicateUserNumbers;
  while (arrayUserNumbers.length < 10) {
    const number = getRandomIntInclusive(1, 10);
    const userNumber = number < 10 ? `0${number}` : `${number}`;
    userNumbers.push(userNumber);
    nonDuplicateUserNumbers = new Set(userNumbers);
    arrayUserNumbers = Array.from(nonDuplicateUserNumbers);
  }
  return arrayUserNumbers;
};
getUserNumbers();

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomIntInclusive, rounding, getRandomArbitrary, getArrayWithUniqueElements, getUserNumbers};
