const MAX_INACTIVE_DAYS = 14; 

chrome.runtime.onStartup.addListener(() => {

  const now = new Date().getTime();

  const lastActive = localStorage.getItem('lastActive');

  if(!lastActive) {
    // 第一次安装插件
    localStorage.setItem('lastActive', now);
  } else {
    const inactiveTime = now - parseInt(lastActive);
    if(inactiveTime > MAX_INACTIVE_DAYS * 24 * 60 * 60 * 1000) {
      chrome.history.deleteAll(() => {
        localStorage.setItem('lastActive', now); 
        console.log('History cleared!');
      });
    } else {
      localStorage.setItem('lastActive', now);
    }
  }

});