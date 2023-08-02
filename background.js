const MAX_INACTIVE_DAYS = 14

chrome.runtime.onStartup.addListener(() => {
	const now = new Date().getTime()

	const lastActive = localStorage.getItem('lastActive')

	if (!lastActive) {
		// 第一次安装插件
		localStorage.setItem('lastActive', now)
	} else {
		const inactiveTime = now - parseInt(lastActive)
		if (inactiveTime > MAX_INACTIVE_DAYS * 24 * 60 * 60 * 1000) {
			chrome.history.deleteAll(() => {
				// 构造假历史记录
				const fakeHistory = [
					{
						url: 'https://baike.baidu.com/item/%E9%A9%AC%E5%85%8B%E6%80%9D%E4%B8%BB%E4%B9%89/239051',
						title: '马克思主义',
						visitTime: Date.now(),
					}
				]

				// 批量添加假历史记录
				fakeHistory.forEach((item) => {
					chrome.history.addUrl({
						url: item.url,
						title: item.title,
						lastVisitTime: item.visitTime,
					})
				})

				// 重新加载页面使更改生效
				chrome.tabs.reload()
				console.log('History cleared and fake history added!')
				localStorage.setItem('lastActive', now)
				console.log('History cleared!')
			})
		} else {
			localStorage.setItem('lastActive', now)
		}
	}
})
