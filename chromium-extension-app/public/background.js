//create context menu options.  the 'on click' command is no longer valid in manifest version 3

chrome.contextMenus.create({
    title: "Send to Fake News Detection System",
    id: "sendToApp",
    contexts: ["selection"]
  });
  

//This tells the context menu what function to run when the option is selected

chrome.contextMenus.onClicked.addListener(newTab);

//Setting up the function to open the new tab
function newTab(info,tab)
{
  const { menuItemId } = info

  if (menuItemId === 'sendToApp'){
    chrome.tabs.create({
      url: "https://supersaiyans.azurewebsites.net/#auto/fa/" + info.selectionText
      
    })}};

    


