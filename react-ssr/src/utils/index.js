const moment = require('moment');

export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i += 1) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return '';
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    }),
  ).join('&');
}

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );
}

/**
 * 时间格式化
 * @param date
 * @param format
 * @returns {*|moment.Moment}
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}
