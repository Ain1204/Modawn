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
window.onload = function() {
  // 로그인된 토큰을 스토리지에서 가져옴
  const token = localStorage.getItem('token');

  // 토큰이 존재하는지 확인
  if (token) {
    // 토큰이 있을 경우, 글쓰기 버튼을 활성화
    const writeButton = document.getElementById('write-button');
    writeButton.disabled = false;
    writeButton.addEventListener('click', goToWritePage);

    const nextBtn = document.getElementById("debate-list");
    nextBtn.addEventListener("click", gotoDebateList);
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

fetch('http://43.200.164.174:3000/api/health-check')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // 서버로부터 받은 데이터(data)를 처리하는 로직을 작성합니다.
    console.log('서버 응답 데이터:', data);
  })
  .catch(error => {
    // 오류가 발생한 경우 오류 처리 로직을 작성합니다.
    console.error('오류 발생:', error);
  });
