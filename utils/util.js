const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const parseCookie = cookie => {
  let cookies = {};
  if (typeof cookie === "string") {
    cookie.split(';').forEach(val => {
      let pair = val.split('=');
      if (!/^(| )(expires|domain|path){1}$/.test(pair[0])) {
        cookies[pair[0]] = pair[1];
      }
    });
  }
  return cookies;
}

module.exports = {
  formatTime: formatTime,
  parseCookie: parseCookie,
}
