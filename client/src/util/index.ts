export const darkColors = [
  '#ede59a',
  '#bbded6',
  '#e1ccec',
  '#ffe8d6',
  '#c3f584',
  '#e0e0e0',
  '#ffe79a',
  '#ffffc1'
];

export const getColor = () =>
  darkColors[Math.floor(Math.random() * darkColors.length)];
