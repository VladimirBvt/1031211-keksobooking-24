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
