const serverAddress = "http://43.200.164.174:3000";
const userToken = localStorage.getItem('token');
const discussionIdx = 1;
let imgUrl = null;

async function submitForm() {
    const typeElement = document.getElementById("type");
    const selectedType = typeElement.options[typeElement.selectedIndex].value; 

    // 선택된 값이 유효한지 확인
    if (selectedType === "APPROVE" || selectedType === "DISAPPROVE" || selectedType === "OTHER") {
        const title = document.getElementById("title").value;
        const assert = document.getElementById("assert").value;
        const content = document.getElementById("content").value;
        const url = document.getElementById("url").value;
        const reason = document.getElementById("reason").value;
        // 토론 등록 함수 호출
        await createDiscussion(title, content, selectedType, url, imgUrl, assert, reason, userToken, discussionIdx);
    } else {
        console.error("유효하지 않은 토론 유형입니다.");
    }
    
}

async function createDiscussion(title, content, type, url = null, imgUrl = null, assert, reason, userToken, discussionIdx) {
    try {
        const apiEndpoint = `/api/discussion/${discussionIdx}/opinion`;

        // 서버에 토론 등록 요청을 보냅니다.
        const response = await fetch(`${serverAddress}${apiEndpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                title: title,                       
                type: type,                 
                assert: assert,          
                url: url,                       
                imgUrl: imgUrl,                    
                reason: reason, 
                content: content,
            }),
        });

        const data = await response.json(); 

        if (data.success) {
            console.log("토론이 등록되었습니다.");
        } else {
            console.error("토론 등록에 실패했습니다:", data.message);
        }
    } catch (error) {
        console.error("토론 등록 중 오류가 발생했습니다:", error);
    }
}

async function loadFile(input) {
    const file = input.files[0];

    try {
        const apiEndpoint = `/api/storage`;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${serverAddress}${apiEndpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
            body: formData
        });

        const responseData = await response.json();

        if (!responseData.success) {
            throw new Error(responseData);
        }

        imgUrl = responseData.data.url;
    } catch (error) {
        console.error("파일 업로드에 실패했습니다:", error);
    }
}
