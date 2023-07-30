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
  } else {
    // 토큰이 없을 경우, login.html 페이지로 리다이렉트
    window.location.href = 'login.html';
  }
};

// 글쓰기 페이지로 이동하는 함수
function goToWritePage() {
  window.location.href = 'mainsubject.html';
}