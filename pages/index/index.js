//index.js
//获取应用实例
import { getBannerData, getRecommendationData, getSpecialSubject } from '../../api/api.js'
import { Banner } from '../../components/banner/banner'
import { Recommendation } from '../../components/recommendation/recommendation.js'
const decorate = require("../../common/decorator.js")
const app = getApp()

Page(decorate({
  data: {
    carouselImages: [],
    recommendationItems: [],
    specialSubjects: [],
    page: 0,
    limit: 6,
    // 锁定scroll状态
    lockScroll: false,
    // 给 scroll view 设置高度
    scrollViewHeight: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.retrieveBannerData();
    this.retrieveRecommandationData();
    this.retrieveNextSpecialSubject();
    // 设置 scroll 高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollViewHeight: res.windowHeight
        })
      },
    })
  },
  retrieveBannerData: function() {
    getBannerData(res => {
      var correctItems = res.data.filter(item => {
        return item.component_type === 1;
      });
      this.setData({
        carouselImages: new Banner(correctItems[0].component_list, banner => {
          this.setData({
            carouselImages: banner
          });
        })
      });
    });
  },
  retrieveRecommandationData: function() {
    getRecommendationData(res => {
      let correctItems = res.data.filter(item => {
        return item.component_type === 6;
      });
      this.setData({
        recommendationItems: new Recommendation(correctItems[0].goodslist.sku)
      });
    });
  },
  retrieveNextSpecialSubject() {
    let limit = this.data.limit;
    let page = this.data.page;
    let lockScroll = this.data.lockScroll;
    if (lockScroll) return;
    this.setData({
      lockScroll: true
    });
    getSpecialSubject({ page: `pn:${page};l:${page}`, limit: this.data.limit }, res => {
      this.setData({
        [`specialSubjects[${page}]`]: res.data.goods_lists,
        lockScroll: false,
        page: page + 1
      });
    })
  }
}))
