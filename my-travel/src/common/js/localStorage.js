export function updateSearch(searchText) {
  let storage = window.localStorage;
  if (storage.search) { //storage里面是否有search
    let search = JSON.parse(storage.search); //取出历史记录search数组
    let index = search.indexOf(searchText); //在search数组里面查找是否有输入的searchText
    if (index != -1) { //找到了，
      search.splice(index, 1);//删除之前存的那一个
      search.unshift(searchText);//在数组的最前面插入刚刚输入的
    } else {//没有找到
      if (search.length <= 7) { //如果search数组小于7
        search.unshift(searchText);//将刚刚查找的searchText插入到数组的最前面
      } else {//search里面已经大于7
        search.splice(search.length-1, 1);//删除最后一个
        search.unshift(searchText);//将刚刚输入的插入到数组的最前面
      }
    }
    search = JSON.stringify(search); //将数组转化成字符串存入localstorage中
    storage.setItem('search', search);

  } else {//如果没有
    let search = JSON.stringify([searchText]);
    storage.setItem('search', search);//如果没有就设置一个search数组
  }
}

//删除某一个历史记录
export function deleteOne(index) {
  let storage = window.localStorage;
  let search = JSON.parse(storage.search);//search转化为数组
  search.splice(index,1);
  search = JSON.stringify(search);
  storage.setItem('search', search); //保存
}
//清除所有历史记录
export function clear() {
  let storage = window.localStorage;
  let search = JSON.stringify([]); //清除置为的时候将数组
  storage.setItem('search', search);
}
