const buttons = document.querySelectorAll('.whiteBtn');


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

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

//토론 상세 페이지로 이동하는 함수
function gotoDebateList() {
  window.location.href = "debateList_part.html";
}

// 글쓰기 페이지로 이동하는 함수
function goToWritePage() {
  window.location.href = 'mainsubject.html';
}

//토론 목록 조회
const apiUrl = `http://43.200.164.174:3000/api/discussion`;

const fetchData = async(limit, offset) => {
  try {
    const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    if(data.success) {
      renderDebateList(data.data.rows);
      renderDebateNextPage(data.data.count, limit, offset);
    } else {
      console.error("API 요청 실패:", data.message);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};

const renderDebateList = (debateList) => {
  const debateListElem = document.querySelector(".mainBlock");

  debateList.forEach((debate) => {
    const isDiscuss = debate.status === 'DISCUSS';

    if (isDiscuss) {
      debateListElem.innerHTML += `
        <a href="/debate/${debate.idx}">
          <div id="debate-list" type="button">
              <span class="textList">${debate.idx}</span>
              <span class="textList">${debate.title}</span>
              <span class="textList">${debate.user.nickname}</span>
              <span class="textList" id="ongoing">진행중</span>
              <span class="textList">${debate.createdDate}</span>
              <span class="textList">${debate.discussionLikeCount}</span>
          </div>
        </a>
      `;
    } else {
      debateListElem.innerHTML += `
        <a href="/debate/${debate.idx}">
          <div class="white-bg" type="button">
              <span class="textList">${debate.idx}</span>
              <span class="textList">${debate.title}</span>
              <span class="textList">${debate.user.nickname}</span>
              <span class="textList">마감</span>
              <span class="textList">${debate.createdDate}</span>
              <span class="textList">${debate.discussionLikeCount}</span>
          </div>
        </a>
      `;
    }
  });
};

const renderDebateNextPage = (count, limit, offset) => {
  const pageListElem = document.querySelector(".pageList");

  for (let page=0; page<count/limit; page++) {
    pageListElem.innerHTML += `
      <a href="/Main.html?page=${page+1}">
        <span class=${offset === page * limit ? "nowPage" : ""}>${page+1}</span>
      </a>
    `;
  }
}
