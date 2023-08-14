export default {
  init (left, leftField, right, rightField, goldField, bool, enlarge) {
    if (leftField && Object.keys(leftField).length === 0) {
      leftField = null
    }
    if (rightField && Object.keys(rightField).length === 0) {
      rightField = null
    }
    if (goldField && Object.keys(goldField).length === 0) {
      goldField = null
    }
    // enlarge 设置放大倍数，决定高度
    let html = ''
    var arrObjFilter = []
    // 取出最后是冠军的人员
    if (left !== null) {
      var level = this.calculationLevel(left.length)
      arrObjFilter = left.filter((ele) => ele.level === level)
      if (arrObjFilter.length === 0) {
        arrObjFilter = right.filter(
          (ele) => ele.level === level
        )
      }
    }
    // 左边对战图
    html += this.drawGame(left, leftField, 'left', enlarge)
    if (bool) {
      // 如果有冠军的产生
      if (arrObjFilter.length > 0) {
        html += this.drawGold(arrObjFilter, left.length, goldField, enlarge)
      } else {
        html += this.drawGold(null, left.length, goldField, enlarge)
      }
    }
    // 右边对战图
    html += this.drawGame(right, rightField, 'right', enlarge)
    return html
  },
  drawGame (arr, field, type, enlarge) {
    if (arr === null || arr.length === 0) {
      return ''
    }
    // 只有一个人轮空
    if (arr.length === 1) {
      return '<div style="font-size:10px;width:50px;margin-top: 40px;position: relative;border-bottom: 1px solid #be1e28;height: 12px;overflow: hidden;">' + arr[0].name + '</div>'
    } else {
      // 计算会打多少轮
      let lun = this.calculationLun(arr.length)
      // 准备对象
      var dataObj = {}
      dataObj['layer_0'] = arr
      let objLength = 1
      for (let i = 1; i < lun; i++) {
        let newArr = dataObj['layer_' + ( i - 1)]
        // 存储每层的数据
        let index = 0
        dataObj['layer_' + i] = []
        objLength++
        let bool = true
        for (let j = 0; j < newArr.length; j++) {
          index++
          if (newArr[j].level >= Math.pow(2, i) - 1) {
            dataObj['layer_' + i].push(newArr[j])
            bool = false
          } else {
            if (index % 2 === 0 && bool) {
              dataObj['layer_' + i].push({
                level: Math.pow(2, i) - 1, 
                name: '&ensp;', 
                image: null,
                agencyName: ''
              })
              bool = true
            }
          }
          if (index % 2 === 0 && !bool) {
            bool = true
          }
        }
      }
      return this.drawLayer(objLength, dataObj, enlarge, type, field)
    }
  },
  drawLayer(objLength, dataObj, enlarge, type, field) {
    // 准备整体div
    let allDiv = type === 'left' ? '<div style="overflow: hidden;width: 100%;float: left;">' : '<div style="overflow: hidden;width: 100%;float:right;">'
    let index = 1
    let cun = 1
    let lunSize = Math.pow(2, objLength)
    for (let key in dataObj) {
      lunSize = lunSize / 2
      // 准备一个div
      let layerDiv = type === 'left' ? '<div style="float:left;width:50px;">' : '<div style="float:left;width:50px;">'
      for (let i = 0; i < lunSize; i++) {
        layerDiv += this.drawLine(objLength, dataObj, key, i, cun, index, enlarge, type, field)
      }
      layerDiv += '</div>'
      allDiv += layerDiv
      index = 2 * index
      cun++
    }
    allDiv += '</div>'
    return allDiv
  },
  drawLine (objLength, dataObj, key, i, cun, index, enlarge, type, field) {
    let block = ''
    if (type === 'left') {
      if (cun < objLength) {
        if (i % 2 === 0) {
          block = '<div class="' + type + '-line1"' + this.calPx(type, index, enlarge, false,'position:absolute;top:0;right:0;width:5px;') + '></div>'
          block += '<div class="' + type + '-line2"' + this.calPx(type, index, enlarge, false,'position:absolute;top:0;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line3"' + this.calPx(type, index, enlarge, true,'position:absolute;border-top:1px solid #be1e28;border-right:1px solid #be1e28;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line4"' + this.calPx(type, index, enlarge, true,'position:absolute;right:10px;width:5px;') + '></div>'
        } else {
          block = '<div class="' + type + '-line1" style="height:' + index * 20 * enlarge + 'px;"></div>'
          block += '<div class="' + type + '-line5"' + this.calPx(type, index, enlarge, false,'position:absolute;border-right:1px solid #be1e28;top:0;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line6"' + this.calPx(type, index, enlarge, true,'position:absolute;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line7"' + this.calPx(type, index, enlarge, true,'position:absolute;right:0;width:5px;') + '></div>'
        }
      }
    } else {
      if (cun < objLength) {
        if (i % 2 === 0) {
          block = '<div class="' + type + '-line1"' + this.calPx(type, index, enlarge, false,'position:absolute;top:0;right:0;width:5px;') + '></div>'
          block += '<div class="' + type + '-line2"' + this.calPx(type, index, enlarge, false,'position:absolute;top:0;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line3"' + this.calPx(type, index, enlarge, true,'position:absolute;border-top:1px solid #be1e28;border-right:1px solid #be1e28;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line4"' + this.calPx(type, index, enlarge, true,'position:absolute;right:10px;width:5px;') + '></div>'
        } else {
          block = '<div class="' + type + '-line1" style="height:' + index * 20 * enlarge + 'px;"></div>'
          block += '<div class="' + type + '-line5"' + this.calPx(type, index, enlarge, false,'position:absolute;border-bottom:1px solid #be1e28;border-right:1px solid #be1e28;top:0;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line6"' + this.calPx(type, index, enlarge, true,'position:absolute;right:15px;width:5px;') + '></div>'
          block += '<div class="' + type + '-line7"' + this.calPx(type, index, enlarge, true,'position:absolute;right:0;width:5px;') + '></div>'
        }
      }
    }
    
    return '<div style=" position:relative;font-size:10px;width:65px;overflow: hidden;height:' + index * 20 * enlarge + "px;line-height:" + index * 20 * enlarge + 'px">'
    + '<span style="position: absolute;top: 7px;left:5px;"> ' + (cun > 1 && field ? field[cun][i].fieldNum  : '') + ' </span>'
    + '<p class="people-width" style="width: 50px;line-height: '+ (index * 10 * enlarge + 2) +'px;height:' + (index * 10 * enlarge + 1) + 'px;border-bottom: 1px solid #be1e28;position: absolute;overflow: hidden;">' 
    + '<span style="position: relative;bottom: ' + (-index * 5 * enlarge + 6 + (enlarge - 1)) + 'px;left: 5px;">'
    + (dataObj[key][i] === undefined ? "" : (field && field[cun] && field[cun][i].victoryXs === 'DISGRID'  ? '' : dataObj[key][i].name)) 
    + '</span>'
    + '</p>'
    + block + '</div>'
  },
  calPx (type, index, enlarge, bool,style) {
    let html = ' style="height:' + (index * 10 * enlarge + 1) + 'px;'
    if (bool) html += 'top:' + (index * 10 * enlarge + 1) + 'px;'
    return html + style + '"'
  },
  drawGold (data, length, goldField, enlarge) {
    let html = ''
    if (length > 1) {
      // 计算会打多少轮
      let lun = this.calculationLun(length)
      // 冠军数据
      let height = length * 20
      html += '<div class="center-box" style="width:65px;float:left;position: relative;">'
      html += '<div class="center-people-box" style="position: absolute;width: 100%;top: -10px;font-size:10px;top: ' + ((-height / 2) * enlarge + 1) + 'px;height: ' + (height + 1) * enlarge + 'px;line-height: ' + (height + 1) * enlarge + 'px;left: ' + (lun * (21 + 30 * enlarge) - lun) + 'px;border-left: 1px solid #be1e28;">'
      html += '<span style="border-bottom: 1px solid #be1e28;padding: 0 0px 0 5px;position: relative;">' + (data !== null ? data[0].name  : '')
      + '<span style="position: absolute;top: 10px;left:5px;line-height: 25px;"> ' + (goldField ? goldField[2][0].fieldNum  : '') + ' </span>'
      + '</span>'
      html += '</div>'
      html += '</div>'
    } else {
      html += '<div style="width:200px;border-left:1px solid #be1e28;height: 54px;position: absolute;left: 50px;line-height: 57px;font-size: 10px;">'
      html += '-' + (goldField ? goldField[2][0].fieldNum  : '') + (data !== null ? data[0].name  : '')
      html += '</div>'
    }
    return html
  },
  calculationLevel(length) {
    if (length === 1) {
      return 1
    } else if (length === 2) {
      return 3
    } else if (length === 4) {
      return 7
    } else if (length === 8) {
      return 15
    } else if (length === 16) {
      return 31
    } else if (length === 32) {
      return 63
    } else if (length === 64) {
      return 127
    } else {
      return 255
    }
  },
  calculationLun (length) {
    if (length === 2) {
      return 2
    } else if (length === 4) {
      return 3
    } else if (length === 8) {
      return 4
    } else if (length === 16) {
      return 5
    } else if (length === 32) {
      return 6
    } else if (length === 64) {
      return 7
    } else if (length === 128) {
      return 8
    } else {
      return 9
    }
  }
}