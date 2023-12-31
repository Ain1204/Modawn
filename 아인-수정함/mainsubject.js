const serverAddress = "http://43.200.164.174:3000";
const userToken = localStorage.getItem('token');
let imgUrl = null;

async function submitForm() {
  const categoryIdx = document.getElementById("categoryIdx").selectedIndex + 1;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const url = document.getElementById("url").value;
  const endDate = document.getElementById("endDate").value;

  await createDiscussion(title, content, categoryIdx, url, imgUrl, endDate, userToken);
}

async function createDiscussion(title, content, categoryIdx, url = null, imgUrl = null, endDate, userToken) {
  try {
      const apiEndpoint = "/api/discussion";

      // 서버에 토론 등록 요청을 보냅니다.
      const response = await fetch(`${serverAddress}${apiEndpoint}`, {
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
              title: title,
              content: content,
              categoryIdx: categoryIdx,
              url: url,
              imgUrl: imgUrl,
              endDate: endDate,
          }),
      });

      const data = await response.json(); // 서버 응답을 JSON 형식으로 파싱합니다.

      if (data.success) {
          console.log("토론이 등록되었습니다.");
          window.location.href = "/Main.html?page=1";
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
    } catch (e) {
        console.error("파일 업로드에 실패했습니다:", e);
    }
}
