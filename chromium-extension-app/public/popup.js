// // Create a context menu item
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.contextMenus.create({
//       id: "sendToApp",
//       title: "Send to Application",
//       contexts: ["selection"]
//     });
//   });
  
//   // Listen for a context menu click event
//   chrome.contextMenus.onClicked.addListener(function(info, tab) {
//     // Check if the clicked item has a specific ID (you can customize this ID)
//     if (info.menuItemId === "sendToApp") {
//       // Get the selected text from the page
//       chrome.tabs.executeScript(
//         {
//           code: "window.getSelection().toString();"
//         },
//         function(result) {
//           // Send the selected text to the desired application or website
//           var selectedText = result[0];
//           sendToApplication(selectedText);
//         }
//       );
//     }
//   });
  
//   // Function to send the highlighted text to the desired application or website
//   function sendToApplication(text) {
//     // Implement your logic here to send the text to the application or website
//     // This can involve making HTTP requests, launching external applications, etc.
//     console.log("Selected text:", text);
//   }
