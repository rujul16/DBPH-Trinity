// background.js

chrome.runtime.onInstalled.addListener(function () {
  // Read substrings from the CSV file
  fetch(chrome.runtime.getURL('substrings.csv'))
    .then(response => response.text())
    .then(data => {
      const substrings = data.split('\n').map(substring => substring.trim()).filter(Boolean);
      chrome.storage.local.set({ substrings });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "updateSubstrings") {
    // Save the updated substrings to storage
    chrome.storage.local.set({ substrings: request.substrings });
  }
});

// Initialize storage with an empty array
chrome.storage.local.set({ substrings: [] });
