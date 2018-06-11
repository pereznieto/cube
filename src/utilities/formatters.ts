import { includes } from 'lodash';
import { Colour } from '../Components/Face';

export const formatTime = (time: number) => {
  const splitTime = String(time).split('');
  const hundredths = splitTime[splitTime.length - 1] || 0;
  const tenths = splitTime[splitTime.length - 2] || 0;
  const totalSeconds = Number(splitTime.slice(0, -2).join('')) || 0;
  const minutes = totalSeconds >= 60 ? Math.trunc(totalSeconds / 60) : 0;
  const secondsUnwrapped = totalSeconds >= 60 ? totalSeconds % 60 : totalSeconds;
  const seconds = String(secondsUnwrapped).length < 2 ? `0${secondsUnwrapped}` : secondsUnwrapped;

  return [minutes, seconds, tenths, hundredths];
};

export const prettifyTime = (time: number) => {
  const [minutes, seconds, tenths, hundredths] = formatTime(time);
  return `${minutes ? `${minutes}:` : ''}${seconds}.${tenths}${hundredths}`;
};

export const average = (times: number[]) => {
  const sum = times.reduce((previous: number, current: number) => previous + current, 0);
  return Math.round(sum / times.length);
};

export const getRandomColour = () => {
  const colours = [Colour.W, Colour.Y, Colour.R, Colour.O, Colour.B, Colour.G];
  return colours[Math.floor(Math.random() * 6)];
};

export const getScramble = (count: number) => Array(count).fill('').reduce(
  (prev, curr, index) => {
    const moves = [
      'R', 'R’', 'R2',
      'L', 'L’', 'L2',
      'U', 'U’', 'U2',
      'D', 'D’', 'D2',
      'F', 'F’', 'F2',
      'B', 'B’', 'B2',
    ];
    const moves_i = [
      'F', 'F’', 'F2',
      'B', 'B’', 'B2',
      'R', 'R’', 'R2',
      'L', 'L’', 'L2',
      'U', 'U’', 'U2',
      'D', 'D’', 'D2',
    ];
    const moves_not = {
      R: ['R', 'L'],
      L: ['R', 'L'],
      U: ['U', 'D'],
      D: ['U', 'D'],
      F: ['F', 'B'],
      B: ['F', 'B'],
    };
    const randomIndex = Math.floor(Math.random() * 18);
    const prevItem = index === 0 ? prev[0] : prev[index];
    const prevInitial = prevItem.split('')[0];
    const currInitial = moves[randomIndex].split('')[0];
    const shouldInverse = includes(moves_not[currInitial], prevInitial);

    return shouldInverse ? [...prev, moves_i[randomIndex]] : [...prev, moves[randomIndex]];
  },
  ['']).join(' ');

export const getMin = (times: number[]) => times.reduce((prev, curr) => prev < curr ? prev : curr);

export const getMax = (times: number[]) => times.reduce((prev, curr) => prev > curr ? prev : curr);
