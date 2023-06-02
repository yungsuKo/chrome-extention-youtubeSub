// DOM이 로드된 후에 실행될 코드
let getTitleBtn = document.getElementById("getTitle");
let sendEventBtn = document.getElementById("sendEvent");
// 이 함수의 본문은 컨텐츠 스크립트로 실행됩니다.
// 현재 페이지
async function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

getTitleBtn.addEventListener("click", async function () {
    window.onload;
    chrome.storage.sync.get("title", ({ title }) => {
        document.getElementById("target12").textContent = title;
    });
});

// sendEventBtn.addEventListener("click", async function () {
//     chrome.runtime.sendMessage({ greeting: "hello" });
// });

// ========== content.js로 이벤트를 전송하는 방법 ==========
// sendEventBtn.addEventListener("click", async function () {
//     console.log("response");
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.tabs.sendMessage(
//             tabs[0].id,
//             { action: "getData" },
//             (response) => {
//                 document.getElementById("target12").textContent =
//                     response?.data; // 웹페이지로부터 받은 데이터를 출력
//             }
//         );
//     });
// });
// ========== ========== ==========

sendEventBtn.addEventListener("click", async function () {
    console.log("response");
    chrome.runtime.sendMessage({ data: "getData" }, function (response) {
        console.log(response);
        document.getElementById("target12").textContent = response?.result;
    });
});
