/**
 * utils函数引入
 */
import showdown from './showdown.js';
import HtmlToJson from './html2json.js';
/**
 * 配置及公有属性
 */
let realWindowWidth = 0;
let realWindowHeight = 0;
wx.getSystemInfo({
  success: function (res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})
/**
 * 主函数入口区
 */
function wxParse(bindName = 'wxParseData', type = 'html', data = '<div class="color:red;">数据不能为空</div>', target, imagePadding) {
  let that = target;
  let transData = {};
  if (type == 'html') {
    transData = HtmlToJson.html2json(data, bindName);
    // console.log(transData);
  } else if (type == 'md' || type == 'markdown') {
    let converter = new showdown.Converter();
    let html = converter.makeHtml(data);
    transData = HtmlToJson.html2json(html, bindName);
    // console.log(transData);
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof (imagePadding) != 'undefined') {
    transData.view.imagePadding = imagePadding
  }
  let bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData)
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}
/**
 * 图片点击事件
 */
function wxParseImgTap(e) {
  let that = this;
  let nowImgUrl = e.target.dataset.src;
  let tagFrom = e.target.dataset.from;
  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl,
      urls: that.data[tagFrom].imageUrls
    })
  }
}

/**
 * 图片视觉宽高计算函数区 
 */
function wxParseImgLoad(e) {
  let that = this;
  let tagFrom = e.target.dataset.from;
  let idx = e.target.dataset.idx;
  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom)
  }
}
/**
 * 假循环获取计算图片视觉最佳宽高
 */
function calMoreImageInfo(e, idx, that, bindName) {
  let temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  let temImages = temData.images;
  let recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  let index = temImages[idx].index
  let key = `${bindName}`
  for (let i of index.split('.')) key += `.nodes[${i}]`
  let keyW = key + '.width'
  let keyH = key + '.height'
  that.setData({
    [keyW]: recal.imageWidth,
    [keyH]: recal.imageheight,
  })
}
/**
 * 计算视觉优先的图片宽高
 */
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  let windowWidth = 0, windowHeight = 0;
  let autoWidth = 0, autoHeight = 0;
  let results = {};
  let padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  if (originalWidth > windowWidth) {
    autoWidth = windowWidth;
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  let array = [];
  let temData = that.data;
  let obj = null;
  for (let i = 0; i < total; i++) {
    let simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }
  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

module.exports = {
  wxParse,
  wxParseTemArray
}


