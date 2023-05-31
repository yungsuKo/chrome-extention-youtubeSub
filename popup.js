// DOM이 로드된 후에 실행될 코드
let changeColor = document.getElementById("changeColor");
let getTitleBtn = document.getElementById("getTitle");
let sendEventBtn = document.getElementById("sendEvent");

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

// sendEventBtn.addEventListener("click", async function () {
//     chrome.runtime.sendMessage({ greeting: "hello" });
// });
sendEventBtn.addEventListener("click", async function () {
    console.log("response");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "getData" },
            (response) => {
                document.getElementById("target12").textContent =
                    response?.data; // 웹페이지로부터 받은 데이터를 출력
            }
        );
    });
});
