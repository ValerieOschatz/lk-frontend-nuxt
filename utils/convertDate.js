const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const convertDate = (value) => {
  const date = new Date(value);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}г. ${date.getHours()}:${date.getMinutes()}`
};
