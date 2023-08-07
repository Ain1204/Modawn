// 페이지가 로드되면 실행되는 함수
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const limit = 8;
  
    // 로그인된 토큰을 스토리지에서 가져옴
    const token = localStorage.getItem('token');
  
    // 토큰이 존재하는지 확인
    if (token) {
      // 토큰이 있을 경우, 글쓰기 버튼을 활성화
      const writeButton = document.getElementById('write-button');
      writeButton.disabled = false;
      writeButton.addEventListener('click', goToWritePage);
  
      // const nextBtn = document.getElementById("debate-list");
      // nextBtn.addEventListener("click", gotoDebateList);
  
      await fetchData(limit, (page - 1) * limit);
    } else {
      // 토큰이 없을 경우, login.html 페이지로 리다이렉트
      window.location.href = 'login.html';
    }
  };

  //의견 상세 페이지로 이동하는 함수
function gotoOpinion() {
    window.location.href = "debateComp.html";
  }

// 글쓰기 페이지로 이동하는 함수
function goToWritePage() {
    window.location.href = 'opinionInput.html';
  }

//의견 목록 조회
const apiUrl = `http://43.200.164.174:3000/api/discussion/:discussionIdx/opinion`;

const fetchData = async(type, limit, offset) => {
  try {
    const response = await fetch(`${apiUrl}?type=${type}&limit=${limit}&offset=${offset}`);
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
        const isAprrove = opinion.type === 'APPROVE';

        if (isAprrove) {
            opinionListElem.innerHTML += `
                <div id="white-bg" type="button">
                    <a href="debateComp.html?opinion=${opinion.idx}">
                        <span class="textList">${opinion.idx}</span>
                        <span class="textList">${opinion.title}</span>
                        <span class="textList">${opinion.user.nickname}</span>
                        <span class="textList">${opinion.createdDate}</span>
                        <span class="textList">${opinion.opinionLikeCount}</span>  
            `;
        }
    });
};

const renderOpinionNextPage = (count, limit, offset) => {
    const pageListElem = document.querySelector(".pageList");
  
    for (let page=0; page<count/limit; page++) {
      pageListElem.innerHTML += `
        <a href="debate_agree.html?page=${page+1}">
          <span class=${offset === page * limit ? "nowPage" : ""}>${page+1}</span>
        </a>
      `;
    }
  }
