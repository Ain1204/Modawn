// 토론 등록 함수
async function createDiscussion(title, content, categoryIdx, url, imgUrl, endDate) {
    try {
      const serverAddress = "http://43.200.164.174:3000";
      const apiEndpoint = "/api/discussion";
      const userToken = "USER_TOKEN"; // 여기에 사용자 토큰을 넣어주세요.
  
      // 서버에 토론 등록 요청을 보냅니다.
      const response = await fetch(`${serverAddress}${apiEndpoint}`, {
        method: "POST", // POST 요청으로 토론을 등록합니다.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // 토큰을 Authorization 헤더에 담아 보냅니다.
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
      } else {
        console.error("토론 등록에 실패했습니다:", data.message);
      }
    } catch (error) {
      console.error("토론 등록 중 오류가 발생했습니다:", error);
    }
  }
  
  // 토론 삭제 함수
  async function deleteDiscussion(discussionIdx) {
    try {
      const serverAddress = "http://43.200.164.174:3000";
      const apiEndpoint = `/api/discussion/${discussionIdx}`;
      const userToken = "USER_TOKEN"; // 여기에 사용자 토큰을 넣어주세요.
  
      // 서버에 토론 삭제 요청을 보냅니다.
      const response = await fetch(`${serverAddress}${apiEndpoint}`, {
        method: "DELETE", // DELETE 요청으로 토론을 삭제합니다.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // 토큰을 Authorization 헤더에 담아 보냅니다.
        },
      });
  
      const data = await response.json(); // 서버 응답을 JSON 형식으로 파싱합니다.
  
      if (data.success) {
        console.log("토론이 삭제되었습니다.");
      } else {
        console.error("토론 삭제에 실패했습니다:", data.message);
      }
    } catch (error) {
      console.error("토론 삭제 중 오류가 발생했습니다:", error);
    }
  }
  
  // 사용 예시
  const discussionIdxToDelete = 123; // 삭제할 토론의 인덱스를 설정합니다.
  
  // 토론 등록 예시
  createDiscussion("토론 제목", "토론 내용", 1, "http://example.com", "http://example.com/image.jpg", "2023-12-31");
  
  // 토론 삭제 예시
  deleteDiscussion(discussionIdxToDelete);
  