# SnapArti - Full Page Screenshot Chrome Extension

A Chrome extension that allows you to capture full-page screenshots, including content that requires scrolling.

## Features

- Captures the entire web page, not just the visible area
- Automatically scrolls through the page to capture all content
- Saves the screenshot as a PNG file
- Simple one-click operation

## Installation

1. Download or clone this repository to your local machine
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The SnapArti extension should now appear in your Chrome toolbar

## Usage

1. Navigate to the web page you want to capture
2. Click the SnapArti icon in your Chrome toolbar
3. Click the "Capture Full Page" button
4. Wait for the extension to scroll through and capture the entire page
5. The screenshot will be automatically downloaded as a PNG file

## Technical Details

This extension uses:
- Chrome's `tabs.captureVisibleTab` API to capture visible sections of the page
- Content scripts to programmatically scroll through the page
- Canvas to stitch together multiple captures into a single image
