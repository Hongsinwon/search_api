// ★★ 함수가져오기
// 1. clear BTN & input focus
import {setSearchFocus, showClearTextButton, clearSearchText, clearPushListener} from "./searchBar.js"; 
// 2.  검색 리스트 출력
import {deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine,} from "./searchResults.js";
// 3. 검색
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";

//DOMContentLoaded 전에 DOM을 삽입하거나 수정하기 위한 이벤트 리스너로서의 readystatechange
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus(); //input focus(검색창이 비워져있으면 focus상태)

  const search = document.getElementById("search");
  const clear = document.getElementById("clear");

  search.addEventListener("input", showClearTextButton); // 텍스트 입력시 X박스(clear box) 생성
  clear.addEventListener("click", clearSearchText); //  clear box click시 텍스트 삭제 + focus
  clear.addEventListener("keydown", clearPushListener); // 엔터키 or 스페이스시 clear box click이벤트

  const form = document.getElementById("searchBar"); // 검색바
  form.addEventListener("submit", submitTheSearch); // 검색바 submit 함수(검색제출)
};

// initApp submit 이벤트 시 앱이 실제로 로드될 때
const submitTheSearch = (event) => {
  event.preventDefault(); //submit 시 새로고침 방지

  deleteSearchResults();  // 검색결과 삭제
  processTheSearch(); //프로세스 검색 결과를 정의하거나 검색기능 처리
  setSearchFocus();  //input focus(검색창이 비워져있으면 focus상태)
};

//프로세스 검색 결과를 정의하거나 검색기능 처리 ===> wikipedia API아 상호작용 => 비동기 함수
const processTheSearch = async () => {
  clearStatsLine(); // 검색결과 삭제
  
  const searchTerm = getSearchTerm(); // 공백처리된 검색어
  if (searchTerm === "") return; //검색어가 없으면 return

  // 검색어를 배열로 다시 가져오기 => 비동기 대기 프로세스를 시작
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray); // 결과가 있는 경우
  setStatsLine(resultArray.length); // 검색결과 갯수
};
