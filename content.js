chrome.runtime.sendMessage({ title: document.title });

// document.addEventListener("DOMContentLoaded", function () {
//     // 이 부분에 DOM이 준비된 후 실행할 코드를 넣습니다.
//     var menuOpenBtn = document.querySelector(
//         "#button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
//     );
//     menuOpenBtn.click();
// });
function doSomethingAsync() {
    return "aaaa";
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting == "hello") {
        sendResponse({ farewell: "goodbye" });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getData") {
        let data = document.querySelector("body").innerText; // 웹페이지에서 데이터를 가져오는 코드
        console.log(data);
        sendResponse({ data: "aaaaaa" });
    }
});
