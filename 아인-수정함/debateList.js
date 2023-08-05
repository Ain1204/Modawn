
async function getUserInfo() {
  const serverAddress = "http://43.200.164.174:3000";
  const apiEndpoint = `/api/user`;
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

    if (!data.success) {
      throw new Error(data);
    }

    return data.data.user;
  } catch (error) {
    console.error("토론 정보를 가져오는 중 오류가 발생했습니다:", error);
  }
}

async function getDiscussionInfo(discussionIdx) {
  const serverAddress = "http://43.200.164.174:3000";
  const apiEndpoint = `/api/discussion/${discussionIdx}`;
  const userToken = localStorage.getItem('token');

  try {
    const userInfo = await getUserInfo();
    const response = await fetch(`${serverAddress}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const responseData = await response.json();

    if (!responseData.success) {
      throw new Error(responseData);
    }

    const debateInfo = responseData.data;

    fillDebateInfo(debateInfo, userInfo);
    fillOpinionInfo(debateInfo.discussion.opinionApproves, debateInfo.discussion.opinionDisapproves, debateInfo.discussion.opinionOthers);

  } catch (error) {
    console.error("토론 정보를 가져오는 중 오류가 발생했습니다:", error);
  }
}

function fillDebateInfo(debateInfo, userInfo) {
  const titleTitleElem = document.querySelector(".titleTitle");
  if (debateInfo.discussion.user.idx === userInfo.idx) {
    titleTitleElem.innerHTML += `
        <button class="whiteBtn"><a href="mainsubject.html">수정</a></button>
        <button class="whiteBtn">삭제</button>
      `;
  } else {
    titleTitleElem.innerHTML += `
        <button class="redBtn">신고</button>
      `;
  }

  // 서버에서 가져온 데이터로 토론 정보를 채워줍니다.
  const imgUrlContentElement = document.querySelector(".imgUrl");
  const urlElement = document.querySelector(".url a");
  const titleElement = document.querySelector(".titleTitle .title1");
  const statusElement = document.querySelector(".titleTitle .ongoing");
  const nicknameElement = document.querySelector("div.titleName span.nickname");
  const contentElement = document.querySelector(".content");
  const debateCategoryElement = document.querySelector(".debateCategory");

  if (debateInfo.discussion.imgUrl) {
    imgUrlContentElement.src = debateInfo.discussion.imgUrl;
  } else {
    imgUrlContentElement.remove();
  }

  urlElement.textContent = debateInfo.discussion.url;
  urlElement.href = debateInfo.discussion.url;
  titleElement.textContent = debateInfo.discussion.title;
  statusElement.textContent = debateInfo.discussion.status === 'DISCUSS' ? '진행중' : '마감';
  nicknameElement.textContent = debateInfo.discussion.user.nickname;
  contentElement.textContent = debateInfo.discussion.content;
  debateCategoryElement.textContent = debateInfo.discussion.discussion_category.type;

  // endDate 값을 "토론 마감: " 뒤에 보이도록 요소를 업데이트합니다.
  const endDateElement = document.querySelector(".titleName span:last-child");
  endDateElement.textContent = `토론 마감: ${debateInfo.discussion.endDate}`;

  const sympathyCountElement = document.querySelector("div.sympathyBtn > div > p");
  sympathyCountElement.textContent = debateInfo.discussionLikeCount;
}

function fillOpinionInfo(approves, disapproves, others) {
  const approvesDetailElem = document.querySelector("div.opinion.approve > div.op > span.opinionDetail");
  const approvesSympathyElem = document.querySelector("div.opinion.approve > div.op > span.sympathy");
  const disapprovesDetailElem = document.querySelector("div.opinion.disapprove > div.op > span.opinionDetail");
  const disapprovesSympathyElem = document.querySelector("div.opinion.disapprove > div.op > span.sympathy");
  const othersDetailElem = document.querySelector("div.opinion.other > div.op > span.opinionDetail");
  const othersSympathyElem = document.querySelector("div.opinion.other > div.op > span.sympathy");

  approves.forEach((item) => {
    approvesDetailElem.innerHTML += `<p>${item.title}</p>`;
    approvesSympathyElem.innerHTML += `<p>좋아요 ${item.likeCount}</p>`;
  });

  disapproves.forEach((item) => {
    disapprovesDetailElem.innerHTML += `<p>${item.title}</p>`;
    disapprovesSympathyElem.innerHTML += `<p>좋아요 ${item.likeCount}</p>`;
  });

  others.forEach((item) => {
    othersDetailElem.innerHTML += `<p>${item.title}</p>`;
    othersSympathyElem.innerHTML += `<p>좋아요 ${item.likeCount}</p>`;
  });
}

(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const debate = urlParams.get('debate');
  getDiscussionInfo(debate);
})();
