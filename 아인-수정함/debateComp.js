const userToken = localStorage.getItem('token');

const urlParams = new URLSearchParams(window.location.search);
const discussionIdx = urlParams.get('discussionIdx');
const opinionIdx = urlParams.get('opinion');

window.onload = async function() {
    const data = await getOpinionDetail(discussionIdx, opinionIdx);
    renderOpinionDetail(data);
}

const getOpinionDetail = async (discussionIdx, opinionIdx) => {
    try {
        const apiUrl = `http://43.200.164.174:3000/api/discussion/${discussionIdx}/opinion/${opinionIdx}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        });
        const data = await response.json();

        if (!data.success) {
            throw new Error(data);
        }

        return data.data;
    } catch (e) {
        console.error("API 요청 실패:", e);
    }
}

const renderOpinionDetail = (opinion) => {
    const title = document.querySelector("div.titleTitle > span.title1");
    const userAndEndDate = document.querySelector("div.debateTitle > div.titleName");

    title.innerHTML = opinion.title;
    userAndEndDate.innerHTML = `<span>${opinion.user.nickname}</span><span>토론 마감 : ${opinion.discussion.endDate}</span>`;

    const opinionImage = document.querySelector("div.debateWrapper > div.debateContent > div.items > img");
    opinionImage.src = opinion.imgUrl;

    const assert = document.querySelector("div.assert > span.date-Detail");
    const reason = document.querySelector("div.reason > span.date-Detail");

    assert.innerHTML = opinion.assert;
    reason.innerHTML = opinion.reason;
}
