const { parseCookie } = require("../utils/util.js");

/**
 * 生成 响应回调的函数（填充 cookie）
 * @param {function} success 成功回调
 */
function cookieResponse(success) {
  return function(res) {
    let cookies = parseCookie(res.header["Set-Cookie"]);
    for (let name in cookies) {
      wx.setCookie(name, cookies[name]);
    }
    success(res);
  }
}
/**
 * 携带 cookie 的请求
 * @param {object} options wx.request options
 */
function cookieRequest(options) {
  if (typeof options.success === "function") {
    options.success = cookieResponse(options.success);
  }
  wx.getCookie({
    success: function(cookies) {
      let cookiesStr = "";
      for (let name in cookies) {
        if (cookiesStr) cookiesStr += ";";
        cookiesStr += ` ${name}=${cookies[name]}`;
      }
      options.headers = Object.assign(options.headers || {}, { "Cookie": cookiesStr });
      wx.request(options);
    },
    fail: function() {
      wx.request(options);
    }
  });
}

/**
 * 获取 banner 的图片数据
 * @param {function} success 成功回调
 * @param {function} fail 错误回调
 */
export function getBannerData(success, fail) {
  cookieRequest({
    url: 'https://api.ilovelook.cn/api/kolshop/gogoboi/coms/list?code=gogoboi',
    method: 'GET',
    success,
    fail
  })
}

/**
 * 获取 本周精选 的图片与数据
 * @param {function} success 成功回调
 * @param {function} fail 错误回调
 */
export function getRecommendationData(success, fail) {
  cookieRequest({
    url: 'https://api.ilovelook.cn/api/kolshop/dabing/coms/list?code=dabing',
    method: 'GET',
    success,
    fail
  })
}

/**
 * 获取 推荐列表 的图片与数据
 * @param {function} success 成功回调
 * @param {function} fail 错误回调
 */
export function getSpecialSubject(data, success, fail) {
  cookieRequest({
    url: 'https://api.ilovelook.cn/api/kolshop/gogoboi/goodslist/list?code=gogoboi',
    method: 'POST',
    data,
    success,
    fail
  })
}
