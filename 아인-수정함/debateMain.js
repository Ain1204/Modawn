const buttons = document.querySelectorAll('.whiteBtn');


buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // 가져온 내용을 headerContainer에 삽입
                document.getElementById("headerContainer").innerHTML = this.responseText;
            }
        };
        xhr.open("GET", "header.html", true);
        xhr.send();
// Fetch API를 사용한 AJAX 요청
fetch('header.html')
  .then((response) => response.text())
  .then((htmlContent) => {
    document.getElementById('headerContainer').innerHTML = htmlContent;
  })
  .catch((error) => {
    console.error('헤더를 가져오는 중 오류 발생:', error);
  });