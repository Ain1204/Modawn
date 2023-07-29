const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // 가져온 내용을 headerContainer에 삽입
                document.getElementById("headerContainer").innerHTML = this.responseText;
            }
        };
        xhr.open("GET", "header.html", true);
        xhr.send();