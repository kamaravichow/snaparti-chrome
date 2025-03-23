(async function () {
  // Save the original scroll position to restore later
  const originalScrollTop = window.scrollY;
  const originalScrollLeft = window.scrollX;

  try {
    // Get the total scroll height and width
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    const scrollWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );

    // Get the visible viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Create a canvas that's the size of the entire page
    const canvas = document.createElement("canvas");
    canvas.width = scrollWidth;
    canvas.height = scrollHeight;
    const ctx = canvas.getContext("2d");

    // Send a message to the background script to capture the screen
    const captureViewport = async () => {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(
          { action: "captureVisibleTab" },
          (response) => {
            resolve(response.dataUrl);
          }
        );
      });
    };

    // Scroll through the page and capture each segment
    for (let y = 0; y < scrollHeight; y += viewportHeight) {
      for (let x = 0; x < scrollWidth; x += viewportWidth) {
        // Scroll to the position
        window.scrollTo(x, y);

        // Wait for any lazy-loaded content to appear
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Capture the current viewport
        const dataUrl = await captureViewport();

        // Draw the captured portion onto the main canvas
        const img = new Image();
        img.src = dataUrl;
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, x, y, viewportWidth, viewportHeight);
            resolve();
          };
        });
      }
    }

    // Convert the canvas to a PNG data URL
    const fullPageDataURL = canvas.toDataURL("image/png");

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = fullPageDataURL;
    downloadLink.download =
      document.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
      "_full_screenshot.png";

    // Click the link to start the download
    downloadLink.click();
  } catch (error) {
    console.error("Error taking screenshot:", error);
    alert("Error taking screenshot: " + error.message);
  } finally {
    // Restore original scroll position
    window.scrollTo(originalScrollLeft, originalScrollTop);
  }
})();
