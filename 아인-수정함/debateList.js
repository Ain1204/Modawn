// debateList.js


// 좋아요 처리 함수
async function toggleLike() {
  try {
    if (discussionIdx === null) {
      console.error("토론을 선택해주세요.");
      return;
    }

    const userToken = "USER_TOKEN"; // 유저 토큰을 적절한 방법으로 가져옵니다.
    const serverAddress = "http://43.200.164.174:3000"; // 서버 주소를 올바르게 변경해주세요.
    const apiEndpoint = `/api/discussion/${discussionIdx}/like`;

    // 서버에 좋아요 상태를 조회하는 요청을 보냅니다.
    const response = await fetch(`${serverAddress}${apiEndpoint}`, {
      method: "GET", // GET 요청으로 좋아요 상태를 조회합니다.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // 토큰을 Authorization 헤더에 담아 보냅니다.
      },
    });

    const data = await response.json(); // 서버 응답을 JSON 형식으로 파싱합니다.

    // 서버로부터 받아온 데이터를 기반으로 처리합니다.
    if (data.isLiked) {
      // 이미 좋아요를 누른 상태라면 좋아요를 취소합니다.
      await cancelLike(discussionIdx, userToken);
    } else {
      // 좋아요를 누르지 않은 상태라면 좋아요를 등록합니다.
      await registerLike(discussionIdx, userToken);
    }
  } catch (error) {
    console.error("좋아요 처리 중 오류가 발생했습니다:", error);
  }
}

// 좋아요 등록을 처리하는 함수
async function registerLike(discussionIdx, userToken) {
  try {
    const serverAddress = "http://43.200.164.174:3000"; // 서버 주소를 올바르게 변경해주세요.
    const apiEndpoint = `/api/discussion/${discussionIdx}/like`;

    // 서버에 좋아요 등록 요청을 보냅니다.
    await fetch(`${serverAddress}${apiEndpoint}`, {
      method: "POST", // POST 요청으로 좋아요를 등록합니다.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // 토큰을 Authorization 헤더에 담아 보냅니다.
      },
    });

    console.log("좋아요가 등록되었습니다.");
  } catch (error) {
    console.error("좋아요 등록 중 오류가 발생했습니다:", error);
  }
}

// 좋아요 취소를 처리하는 함수
async function cancelLike(discussionIdx, userToken) {
  try {
    const serverAddress = "http://43.200.164.174:3000"; // 서버 주소를 올바르게 변경해주세요.
    const apiEndpoint = `/api/discussion/${discussionIdx}/like`;

    // 서버에 좋아요 취소 요청을 보냅니다.
    await fetch(`${serverAddress}${apiEndpoint}`, {
      method: "DELETE", // DELETE 요청으로 좋아요를 취소합니다.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`, // 토큰을 Authorization 헤더에 담아 보냅니다.
      },
    });

    console.log("좋아요가 취소되었습니다.");
  } catch (error) {
    console.error("좋아요 취소 중 오류가 발생했습니다:", error);
  }
}
