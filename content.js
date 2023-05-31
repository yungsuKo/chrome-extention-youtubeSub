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
        let sellAmount7Day = 0;
        let data = document.querySelectorAll(
            "#INTRODUCE > div > div.R_sjsDSRfc > div._2Y8Oh-KkFd > div._3uR_9UaARA > ul > li:nth-child(n) > em > strong"
        ); // 웹페이지에서 데이터를 가져오는 코드
        data.forEach((i) => {
            console.log(i.innerText.replace("건", ""));
            sellAmount7Day += parseInt(i.innerText.replace("건", ""));
        });
        console.log(sellAmount7Day);
        sendResponse({ data: sellAmount7Day });
    }
});
