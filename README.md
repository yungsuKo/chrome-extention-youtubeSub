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

-   이 스크립트는 확장 프로그램의 기능을 제어하며, 팝업이 닫혀있거나 웹 페이지가 로드되지 않아도 계속해서 작동합니다. Background 스크립트는 주로 확장 프로그램의 생명주기를 관리하고, 다른 스크립트 간의 메시지를 중계하는 역할을 합니다.
-   익스텐션의 이벤트 핸들러이며 익스텐션에 중요한 브라우저 이벤트들의 리스너들을 포함합니다. 백그라운드에서 계속 돌아가면서 이벤트가 발생하면 지시된 논리를 수행합니다.

### UI Element

-   이 스크립트는 사용자가 확장 아이콘을 클릭하여 팝업 창을 열 때 실행됩니다. 이 팝업 스크립트는 팝업의 DOM을 조작하거나, 사용자 상호작용에 반응할 수 있습니다.
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

-   이 스크립트는 웹 페이지의 DOM에 직접 액세스하며, 웹 페이지에 존재하는 요소를 읽거나 변경할 수 있습니다. Content 스크립트는 웹 페이지의 스크립트와 독립적으로 작동하며, 웹 페이지가 로드될 때마다 실행됩니다.
-   웹페이지를 읽거나 쓰는 확장기능을 함.
-   이 스크립트는 브라우저가 방문하는 웹페이지의 Dom을 읽고 수정함
-   메시지를 교환하고 스토리지 API를 사용하여 값을 저장함으로써 상위 확장과 통신할 수 있음

### Option Page

-   익스텐션을 커스터마이징하게 만들어줌

### 주된 사용방법

-   일단 익스텐션을 사용하면 크게 3가지 작업을 할 수 있을 듯

1. 데이터를 어디서 가져오느냐
    - 웹 콘텐츠 내에서 가져오거나
    - 외부 API를 호출해서 가져올 수 있음.
2. 어떤 상황에서 트리거를 줄 것이냐 => 웹에는 존재하지 않는 함수를 추가한다. 라는 컨셉으로 이해하면 편할 듯.
    - 웹 콘텐츠가 로딩되었을 때 한다.
    - 팝업 내에서 특정 버튼을 눌렀을 때 트리거한다.
3. 이후 어디로 데이터를 보낼 것인가
    - 현재 웹콘텐츠 내에 데이터를 보여준다.
    - 크롬 익스텐션 팝업 안에다가 데이터를 보여준다.
    - API를 호출하여 데이터를 보내준다.
