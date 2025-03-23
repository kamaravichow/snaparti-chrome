// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "captureVisibleTab") {
    chrome.tabs.captureVisibleTab(
      sender.tab.windowId,
      { format: "png", quality: 100 },
      (dataUrl) => {
        sendResponse({ dataUrl: dataUrl });
      }
    );
    // Return true to indicate we'll respond asynchronously
    return true;
  }
});
