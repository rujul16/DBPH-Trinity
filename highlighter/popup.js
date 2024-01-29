// popup.js

document.addEventListener("DOMContentLoaded", function() {
  // Get the current substrings from storage and populate the textarea
  chrome.storage.local.get("substrings", function(result) {
    const substringsInput = document.getElementById("substringsInput");
    substringsInput.value = result.substrings.join("\n");
  });

  // Apply the entered substrings to the content script
  document.getElementById("applyButton").addEventListener("click", function() {
    const substringsInput = document.getElementById("substringsInput");
    const substrings = substringsInput.value.split("\n").map(str => str.trim());
    
    // Send the updated substrings to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "updateSubstrings", substrings });
    });
  });
});
