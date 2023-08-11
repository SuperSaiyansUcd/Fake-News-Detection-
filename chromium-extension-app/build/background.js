// Create a context menu item
    chrome.runtime.onInstalled.addListener(function() {
        chrome.contextMenus.create({
          id: "sendToApp",
          title: "Send to Fake News Detection Website",
          contexts: ["selection"]
        });
    });

    // Listen for a context menu click event
    chrome.contextMenus.onClicked.addListener(function(info, tab) {
      // Check if the clicked item has a specific ID (you can customize this ID)
      if (info.menuItemId === "sendToApp") {
        // Get the selected text from the page
        sendToApplication(info.selectionText);
      }
    });




    // Function to send the highlighted text to the website
    function sendToApplication(selectedText) {
        
        console.log("Selected text:", selectedText);
        chrome.tabs.create({ url: "http://localhost:3000/?text=" + encodeURIComponent(selectedText) });
    }