// DOM이 로드된 후에 실행될 코드

let youtubeBtn = document.getElementById("youtubeEvent");
let copyBtn = document.getElementById("copyBtn");
// 이 함수의 본문은 컨텐츠 스크립트로 실행됩니다.
// 현재 페이지

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
//                 document.getElementById("script").textContent =
//                     response?.data; // 웹페이지로부터 받은 데이터를 출력
//             }
//         );
//     });
// });
// ========== ========== ==========

youtubeBtn.addEventListener("click", async function () {
    console.log("response");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "getYoutubeData" },
            (response) => {
                document.getElementById("script").textContent = response?.data; // 웹페이지로부터 받은 데이터를 출력
            }
        );
    });
});

copyBtn.addEventListener("click", async function () {
    var copyInput = document.getElementById("script");
    try {
        await navigator.clipboard.writeText(copyInput.innerText);
        alert("텍스트가 복사되었습니다");
    } catch (err) {
        console.error("텍스트를 복사하는 데 실패했습니다.", err);
    }
});
