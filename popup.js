// DOM이 로드된 후에 실행될 코드
let changeColor = document.getElementById("changeColor");
let getTitleBtn = document.getElementById("getTitle");

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    console.log(tab);
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});
// 이 함수의 본문은 컨텐츠 스크립트로 실행됩니다.
// 현재 페이지
async function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

getTitleBtn.addEventListener("click", async function () {
    window.onload;
    chrome.storage.sync.get("sendMessage", ({ sendMessage }) => {
        document.getElementById("target12").textContent = sendMessage;
    });
});

// async function getTitle() {
//     console.log(document.title);
//     chrome.runtime.sendMessage({ title: document.title });
// }

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     document.getElementById("target12").textContent = "message.title";
// });

// getTitle.addEventListener("click", async function () {
//     let [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true,
//     });
//     title = document.title;
//     console.log(title);
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: setTitle(title),
//     });
// });

// async function setTitle(title) {
//     console.log(title);
//     chrome.storage.sync.get("color", ({ color }) => {
//         document.body.style.backgroundColor = color;
//     });
// }
