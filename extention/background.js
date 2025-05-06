// background.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      // Khi extension được cài đặt lần đầu
      chrome.tabs.create({ url: 'https://www.youtube.com/@androidmodvip' });
    }
  });
  
