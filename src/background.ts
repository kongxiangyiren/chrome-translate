// 监听安装事件
chrome.runtime.onInstalled.addListener(function () {
  console.log('installed')
  // 创建右键菜单
  chrome.contextMenus.create(
    {
      id: 'chrome-translate',
      title: 'chrome翻译',
      // 选中文本
      contexts: ['selection'],
      visible: true,
      enabled: true,
    },
    function () {
      console.log('contextMenus.create')
    },
  )
})

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'chrome-translate') {
    chrome.tabs.create({
      url: 'index.html?text=' + info.selectionText,
    })
  }
})

// 设置Popup页
// chrome.action.setPopup({
//   popup: 'index.html',
// })

// action 左键点击跳转
chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({
    url: 'index.html',
  })
})
