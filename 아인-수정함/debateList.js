async function getDiscussionInfo(discussionIdx) {
  const serverAddress = "http://0.0.0.0:3000";
  const apiEndpoint = `/api/discussion/${discussionIdx}`;
  const userToken = localStorage.getItem('token');  

  try {
    const response = await fetch(`${serverAddress}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const data = await response.json();

    // 서버에서 가져온 데이터로 토론 정보를 채워줍니다.
    const imgUrlElement = document.querySelector(".imgUrl p");
    const urlElement = document.querySelector(".url p");

    imgUrlElement.textContent = data.imgUrl;
    urlElement.textContent = data.url;

    // endDate 값을 "토론 마감: " 뒤에 보이도록 요소를 업데이트합니다.
    const endDateElement = document.querySelector(".titleName span:last-child");
    endDateElement.textContent = `토론 마감: ${data.endDate}`;
  } catch (error) {
    console.error("토론 정보를 가져오는 중 오류가 발생했습니다:", error);
  }
}
