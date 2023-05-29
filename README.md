# Chrome Extemsion 튜토리얼

## Chrome extension 구성 요소

-   Manifest
-   Background script
-   UI Element
-   Content Script
-   Options Page

### Manifest

-   중요한 정보를 제공하는 manifest.json이라는 JSON 형식의 파일을 가지고 있습니다.
    <code>
    {  
     "name": "My Extension",  
     "description": "A nice little demo extension.",  
     "version": "2.1",  
     "manifest_version": 3,  
    }
    </code>

<br/>

### Background script

-   익스텐션의 이벤트 핸들러이며 익스텐션에 중요한 브라우저 이벤트들의 리스너들을 포함합니다. 백그라운드에서 계속 돌아가면서 이벤트가 발생하면 지시된 논리를 수행합니다.

### UI Element

-   유저 인터페이스 부분을 담당함.
-   tabs.create()나 window.open()을 호출하여 다른 페이지를 띄울 수 있음.  
     <code>
    `{    
    "name": "Getting Started Example",    
    "description": "Build an Extension!",    
    "version": "1.0",    
    "manifest_version": 3,    
    "background": {   
        "service_worker": "background.js"   
    },    
    "action": {   
        "default_popup": "popup.html",  
    },    
}
`
    </code>

### Content Script

-   웹페이지를 읽거나 쓰는 확장기능을 함.
-   이 스크립트는 브라우저가 방문하는 웹페이지의 Dom을 읽고 수정함
-   메시지를 교환하고 스토리지 API를 사용하여 값을 저장함으로써 상위 확장과 통신할 수 있음

### Option Page

-   익스텐션을 커스터마이징하게 만들어줌
