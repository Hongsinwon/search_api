//함수가져오기
import { setSearchFocus, showClearTextButton } from './searchBar.js';
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchResults.js';
import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';

//DOMContentLoaded 전에 DOM을 삽입하거나 수정하기 위한 이벤트 리스너로서의 readystatechange
document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

// ★★★ 검색제출에 필요한 순서대로 다른 함수를 호출하는 절차적 함수 ("workflow") 부를것.

const initApp = () => {
  // 텍스트 input에 포커스 설정 => searchBar.js (setSearchFocus())
  setSearchFocus();

  const search = document.getElementById('search');
  // 텍스트 입력시 X박스(clear box) 생성
  //search.addEventListener('input', showClearTextButton);

  // 3. clear box click시 텍스트 삭제

  const form = document.getElementById('searchBar'); //양식
  form.addEventListener('submit', submitTheSearch); // 검 submit 함수(검색제출)
};

// initApp submit 이벤트 시 앱이 실제로 로드될 때
const submitTheSearch = (event) => {
  event.preventDefault(); //submit 시 새로고침 방지

  // 검색결과 삭제
  deleteSearchResults();

  //프로세스 검색 결과를 정의하거나 검색기능 처리
  processTheSearch();

  //포커스를 가져오는 파일 중 하나로 설정 => searchBar.js (setSearchFocus())
  setSearchFocus();
};

//프로세스 검색 결과를 정의하거나 검색기능 처리 ===> wikipedia API아 상호작용 => 비동기 함수
const processTheSearch = async () => {
  clearStatsLine(); // 검색결과 삭제
  const searchTerm = getSearchTerm(); // 공백처리된 검색어
  if (searchTerm === '') return; //검색어가 없으면 return

  // 검색어를 배열로 다시 가져오기 => 비동기 대기 프로세스를 시작
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray); // 결과가 있는 경우
  setStatsLine(resultArray.length); // 검색결과 갯수
};
