let color = "#3aa757";
var sendMessage;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 'request.data' contains the data from the content script
    console.log(request);
    sendMessage = request.title;
    chrome.storage.sync.set({ sendMessage });
    // TODO: Display this data in your extension's UI
});
