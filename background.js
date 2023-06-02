let color = "#3aa757";
var sendMessage;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 'request.data' contains the data from the content script
    if (request.title) {
        console.log(request);
        title = request.title;
        chrome.storage.sync.set({ title });
    }

    if (request.data) {
        console.log(request);
        fetch(
            "https://smartstore.naver.com/i/v1/stores/100012316/products/6056271456"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                console.log(data.sellerDailyDeliveryLeadTimes.leadTimeCount);
                const deliveryCnts =
                    data.sellerDailyDeliveryLeadTimes.leadTimeCount;
                const deliverySum = deliveryCnts.reduce(
                    (acc, cur) => acc + cur,
                    0
                );

                sendResponse({ result: deliverySum });
            });
        return true;
    }

    // TODO: Display this data in your extension's UI
});
