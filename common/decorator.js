/**
 * page 装饰器
 * 注入 console.log('Hack PageOnLoad')
 * @param {object} page
 */
module.exports = function (page) {
  if (page && typeof page.onLoad === "function") {
    let load = page.onLoad;
    page.onLoad = function () {
      console.log('Hack PageOnLoad');
      let pages = getCurrentPages();
      load.call(pages[pages.length - 1]);
    }
  }
  return page;
}