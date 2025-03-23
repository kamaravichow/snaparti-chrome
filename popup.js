document.addEventListener("DOMContentLoaded", function () {
  const captureBtn = document.getElementById("captureBtn");

  captureBtn.addEventListener("click", async () => {
    // Get the active tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Inject the content script that will take the screenshot
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"],
    });
  });
});
