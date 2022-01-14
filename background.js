let color = "#3a2c7f7e";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});
