chrome.runtime.sendMessage({ title: document.title });

// document.addEventListener("DOMContentLoaded", function () {
//     // 이 부분에 DOM이 준비된 후 실행할 코드를 넣습니다.
//     var menuOpenBtn = document.querySelector(
//         "#button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
//     );
//     menuOpenBtn.click();
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 1. 이미 메뉴 리스트가 오픈 되어 있을 경우 미동작
    // 2. 스크립트 표시가 오픈 되어 있을 경우 미동작

    if (request.action === "getYoutubeData") {
        // 1. ... 버튼을 클릭하고 pop-over 메뉴가 열림
        // 거기서 배열로 받아서 "스크립트 표시"가 적혀있는 메뉴를 클릭한다.
        let scripts;
        document
            .querySelector(
                "#button-shape > button > yt-touch-feedback-shape > div"
            )
            .click();
        // 2. 현재는 settimeout을 통해서 동적 웹에서 데이터가 추가된 것을 감지하고 데이터를 불러오는데,
        // 이 부분을 수정해서 데이터가 추가되면 바로 데이터를 불러오도록 수정해야함.

        // ============= 강제로 setTimeout을 두어 작동하도록 한 방법 =============
        // setTimeout(() => {
        //     const menuList = document.querySelectorAll(
        //         "#items > ytd-menu-service-item-renderer:nth-child(n)"
        //     );
        //     menuList.forEach((i) => {
        //         if (i.innerText === "스크립트 표시") {
        //             i.click();
        //         }
        //     });
        // }, 500);

        // ============= 강제로 setTimeout을 두어 작동하도록 한 방법 =============
        // setTimeout(() => {
        //     let fullScript;
        //     scripts = document.querySelectorAll(
        //         "#segments-container > ytd-transcript-segment-renderer:nth-child(n) > div > yt-formatted-string"
        //     );
        //     console.log(scripts);
        //     scripts.forEach((i) => {
        //         fullScript = fullScript + " " + i.innerText;
        //     });
        //     sendResponse({ data: fullScript });
        // }, 2000);

        // 스크립트 창이 정상적으로 열렸는지 여부 확인 및 최종적으로 스크립트 표시 메뉴 클릭
        var checkScript = document.querySelectorAll(
            "#segments-container > ytd-transcript-segment-renderer:nth-child(n) > div > yt-formatted-string"
        );
        var checkMenu = document.querySelectorAll(
            ".ytd-menu-service-item-renderer"
        );
        var config = { attributes: true, childList: true, subtree: true };
        var fullScript;
        if (checkScript.length > 0) {
            // 스크립트 창이 이미 열려있는 경우
            console.log(checkScript);
            console.log("I already have script");
            scripts = document.querySelectorAll(
                "#segments-container > ytd-transcript-segment-renderer:nth-child(n) > div > yt-formatted-string"
            );
            scripts.forEach((i) => {
                fullScript = fullScript + " " + i.innerText;
            });
            sendResponse({ data: fullScript });
        } else if (checkMenu.length > 0) {
            // 메뉴가 이미 열려있는 경우
            console.log("I already have menu");
            checkMenu.forEach(async (i) => {
                if (i.innerText === "스크립트 표시") {
                    await i.click();
                }
            });
            var targetNodeScript = document.getElementById("panels");
            var observerScript = new MutationObserver(function (
                mutationsList,
                observer
            ) {
                for (let mutation of mutationsList) {
                    // 만약 추가된 노드가 있으면
                    if (
                        mutation.type === "childList" &&
                        mutation.addedNodes.length > 0
                    ) {
                        // 추가된 노드 각각에 대해
                        mutation.addedNodes.forEach((node) => {
                            // 원하는 요소인지 확인
                            if (
                                node.matches &&
                                node.matches(".ytd-transcript-segment-renderer")
                            ) {
                                scripts = document.querySelectorAll(
                                    "#segments-container > ytd-transcript-segment-renderer:nth-child(n) > div > yt-formatted-string"
                                );
                                scripts.forEach((i) => {
                                    fullScript = fullScript + " " + i.innerText;
                                });
                                sendResponse({ data: fullScript });
                                observer.disconnect();
                            }
                        });
                    }
                }
            });
            observerScript.observe(targetNodeScript, config);
        } else {
            // 메뉴 정상적으로 열렸는지 여부 확인 및 최종적으로 스크립트 표시 메뉴 클릭
            var targetNodeMenu = document.querySelector(
                "body > ytd-app > ytd-popup-container"
            );
            var observerMenu = new MutationObserver(function (
                mutationsList,
                observer
            ) {
                for (let mutation of mutationsList) {
                    // 만약 추가된 노드가 있으면
                    if (
                        mutation.type === "childList" &&
                        mutation.addedNodes.length > 0
                    ) {
                        // 추가된 노드 각각에 대해
                        mutation.addedNodes.forEach((node) => {
                            // 원하는 요소인지 확인
                            if (
                                node.matches &&
                                node.matches(
                                    ".ytd-menu-service-item-renderer"
                                ) &&
                                node.innerText === "스크립트 표시"
                            ) {
                                node.click();
                                observer.disconnect();
                            }
                        });
                    }
                }
            });
            observerMenu.observe(targetNodeMenu, config);

            var targetNodeScript = document.getElementById("panels");
            var observerScript = new MutationObserver(function (
                mutationsList,
                observer
            ) {
                for (let mutation of mutationsList) {
                    // 만약 추가된 노드가 있으면
                    if (
                        mutation.type === "childList" &&
                        mutation.addedNodes.length > 0
                    ) {
                        // 추가된 노드 각각에 대해
                        mutation.addedNodes.forEach((node) => {
                            // 원하는 요소인지 확인
                            if (
                                node.matches &&
                                node.matches(".ytd-transcript-segment-renderer")
                            ) {
                                scripts = document.querySelectorAll(
                                    "#segments-container > ytd-transcript-segment-renderer:nth-child(n) > div > yt-formatted-string"
                                );
                                scripts.forEach((i) => {
                                    fullScript = fullScript + " " + i.innerText;
                                });
                                sendResponse({ data: fullScript });
                                observer.disconnect();
                            }
                        });
                    }
                }
            });
            observerScript.observe(targetNodeScript, config);
        }
        return true;
    }
});
