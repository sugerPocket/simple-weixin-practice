/**
 * 获取 cookie
 * @param {string} name cookie 名字，空表示全部
 * @param {function} success 成功回调函数
 */
function getCookie({ name, success }) {
  wx.getStorage({
    key: "cookies",
    success: res => {
      let cookies = {};
      try {
        cookies = JSON.parse(res.data);
      } catch (err) {}
      console.log(cookies);
      success(cookies ? (name ? cookies[name] : cookies) : "");
    },
    fail: () => {
      wx.setStorageSync("cookies", "{}")
      success(null);
    },
  });
}

/**
 * 设置 cookie
 * @param name cookie 名字
 * @param value cookie 值
 */
function setCookie(name, value) {
  wx.getStorage({
    key: 'cookies',
    success: function(res) {
      let cookies = {};
      try {
        cookies = JSON.parse(res.data);
      } catch(err) {}
      cookies[name] = value;
      wx.setStorage({
        key: "cookies",
        data: JSON.stringify(cookies),
      });
    },
    fail: () => {
      wx.setStorageSync("cookies", JSON.stringify({[name]: value}));
    }
  })
}

module.exports = {
  setCookie,
  getCookie,
};