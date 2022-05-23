// 함수를 내보내기 위해 export 사용, 1개의 함수가 하나의 일만 수행하길 원함.

// 1. 검색 focus 설정
export const setSearchFocus = () => {
  document.getElementById("search").focus();
};

// 2. input 텍스트 작성시 clear icon 보이기
export const showClearTextButton = () => {
  const search = document.getElementById("search");
  const clear = document.getElementById("clear");

  if (search.value.length) {
    clear.classList.remove("none");
    //clear.classList.add("flex");
  } else {
    clear.classList.add("none");
    //clear.classList.remove("flex");
  }
};

// 3. 검색이 진행되면 빈 문자열을 만들고 focus 진행
export const clearSearchText = (event) => {
  event.preventDefault();
  document.getElementById("search").value = "";
  const clear = document.getElementById("clear");
  clear.classList.add("none");
  setSearchFocus();
};

//4. 엔터키와 스페이스 키를 누를시 clear click
export const clearPushListener = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    document.getElementById("clear").click();
  }
};
