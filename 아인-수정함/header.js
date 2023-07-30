/*                 팝업               */

// SVG 파일을 클릭했을 때 모달 팝업창이 나타나도록 이벤트 리스너를 추가합니다.
const profileSVG = document.getElementById("profile-svg");
profileSVG.addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.style.display = "block"; // 모달 창을 보이도록 스타일을 변경합니다.
});

// 모달 창 닫기 버튼을 클릭했을 때 모달 팝업창이 닫히도록 이벤트 리스너를 추가합니다.
const closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.style.display = "none"; // 모달 창을 숨기도록 스타일을 변경합니다.
});



  

// 토큰 상태에 따라 버튼과 모달 창을 업데이트하는 함수
function updateUIWithToken(token) {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const profileBtn = document.getElementById('profile-btn');
  const profileSVG = document.getElementById('profile-svg');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modal = document.getElementById('modal');

  if (token) {
    // 토큰이 있다면 로그인 상태로 간주합니다.
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    profileBtn.style.display = 'block';
    profileSVG.setAttribute('fill', '#3E66E8');
    modalTitle.textContent = '로그인 상태';
    modalMessage.textContent = '로그아웃 하시겠습니까?';
  } else {
    // 토큰이 없다면 로그아웃 상태로 간주합니다.
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    profileBtn.style.display = 'none';
    profileSVG.setAttribute('fill', '#A0A0A0');
    modalTitle.textContent = '로그인';
    modalMessage.textContent = '로그인하시겠습니까?';
  }

  // 모달 창을 닫아줍니다.
  modal.style.display = 'none';
}

// DOM이 로드되면 실행되는 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
  // 토큰이 저장되어 있는지 확인합니다.
  const token = localStorage.getItem('token');
  updateUIWithToken(token);
});

// 로그인 버튼 클릭 시 login.html로 이동
document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = 'login.html'; // 로그인 페이지로 이동
});

// 로그아웃 버튼 클릭 시 로그아웃 처리
document.getElementById('logout-btn').addEventListener('click', function() {
  // 토큰을 로컬 스토리지에서 제거
  localStorage.removeItem('token');
  // 로그아웃 알림 메시지 표시
  alert('로그아웃 되었습니다.');
  // UI 업데이트
  updateUIWithToken(null);
});

// 프로필 관리 버튼 클릭 시 프로필 관리 페이지로 이동
document.getElementById('profile-btn').addEventListener('click', () => {
  // 프로필 관리 페이지로 이동하는 코드를 여기에 작성해주세요.
  // 예: window.location.href = 'profile.html';
});
