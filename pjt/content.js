// // content.js

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.message === "updateSubstrings") {
//     highlightElements(request.substrings);
//   }
// });

// chrome.storage.local.get("substrings", function (result) {
//   highlightElements(result.substrings);
// });

// function highlightElements(substrings) {
//   const elements = document.body.getElementsByTagName("*");

//   for (const element of elements) {
//     for (const substring of substrings) {
//       const text = element.innerText;
//       const index = text.indexOf(substring);

//       if (index !== -1) {
//         const highlightedText = `<span class="highlight">${substring}</span>`;
//         const newText = text.slice(0, index) + highlightedText + text.slice(index + substring.length);

//         element.innerHTML = newText;

//         // Add the CSS rule for the 'highlight' class
//         const style = document.createElement("style");
//         style.textContent = `
//           .highlight {
//             background-color: yellow; /* Adjust styles as needed */
//           }
//         `;
//         document.head.appendChild(style);
//       }
//     }
//   }
// }

// content.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "updateSubstrings") {
    // Update the highlighted elements based on the new substrings
    highlightElements(request.substrings);
  }
});

// Initial highlighting based on the default or last set substrings
chrome.storage.local.get("substrings", function (result) {
  highlightElements(result.substrings);
});

function highlightElements(substrings) {
  const elements = document.body.getElementsByTagName("*");

  for (const element of elements) {
    for (const substring of substrings) {
      if (element.innerText.includes(substring)) {
        element.style.border = "2px solid red";
        break; // Highlight the element once and move to the next one
      }
    }
  }
}
