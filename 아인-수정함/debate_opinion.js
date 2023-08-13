const userToken = localStorage.getItem('token');

const path = window.location.pathname;
const pathName = path.split('/').pop();

const urlParams = new URLSearchParams(window.location.search);
const discussionIdx = urlParams.get('discussionIdx');
const page = urlParams.get('page');
const type = urlParams.get('type');

// 페이지가 로드되면 실행되는 함수
window.onload = async function() {
    const limit = 8;

    // 토큰이 존재하는지 확인
    if (userToken) {
      // 토큰이 있을 경우, 글쓰기 버튼을 활성화
      // const writeButton = document.getElementById('write-button');
      // writeButton.disabled = false;
      // writeButton.addEventListener('click', goToWritePage);
  
      // const nextBtn = document.getElementById("debate-list");
      // nextBtn.addEventListener("click", gotoDebateList);
  
      await fetchData(discussionIdx, type, limit, (page - 1) * limit);
    } else {
      // 토큰이 없을 경우, login.html 페이지로 리다이렉트
      window.location.href = 'login.html';
    }
  };

//의견 목록 조회
const fetchData = async(discussionIdx, type, limit, offset) => {
  try {
    const apiUrl = `http://43.200.164.174:3000/api/discussion/${discussionIdx}/opinion`;
    const response = await fetch(`${apiUrl}?type=${type}&limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
    });
    const data = await response.json();

    if(data.success) {
      renderOpinionList(data.data.rows);
      renderOpinionNextPage(data.data.count, limit, offset);
    } else {
      console.error("API 요청 실패:", data.message);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};

const renderOpinionList = (opinionList) => {
    const opinionListElem = document.querySelector(".mainBlock");

    opinionList.forEach((opinion) => {
        opinionListElem.innerHTML += `
            <div class="white-bg">
                <a href="debateComp.html?opinion=${opinion.idx}">
                    <span class="textList">${opinion.idx}</span>
                    <span class="textList">${opinion.title}</span>
                    <span class="textList">${opinion.user.nickname}</span>
                    <span class="textList">${opinion.createdDate}</span>
                    <span class="textList">${opinion.opinionLikeCount}</span>
                </a>
            </div>
        `;
    });
};

const renderOpinionNextPage = (count, limit, offset) => {
    const pageListElem = document.querySelector(".pageList");
  
    for (let page=0; page<count/limit; page++) {
      pageListElem.innerHTML += `
        <a href="${pathName}?discussionIdx=${discussionIdx}&type=${type}&page=${page+1}">
          <span class=${offset === page * limit ? "nowPage" : ""}>${page+1}</span>
        </a>
      `;
    }
  }
