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




// "로그아웃" 버튼을 클릭하면 해당 기능을 수행하는 이벤트 리스너를 추가합니다.
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", function() {
    // 로그아웃 기능을 수행하는 코드를 추가합니다.

    // 토큰을 로컬 스토리지에서 제거
    localStorage.removeItem("token");

    // 로그아웃 알림 메시지 표시
    alert("로그아웃 되었습니다.");

    // 로그아웃 후 다시 로그인 페이지로 이동
    window.location.href = "Login.html";
});

// ...
