export function Banner(data, render) {
  this.currentIdx = 0;
  this.max = data.length;
  this.items = data;
  // 滚动效果
  setInterval((function () {
    this.currentIdx = (this.currentIdx + 1) % this.max;
    if (typeof render === "function") render(this);
  }).bind(this), 3000);
}