// 함수를 내보내기 위해 export 사용, 1개의 함수가 하나의 일만 수행하길 원함.

// 1. 검색어를 가져져오기
export const getSearchTerm = () => {
  // 검색바에서 검색한 문장을 가져오고 각 끝에 있는 공백 제거
  // .value => 텍스트 상자에서 값을 가져오고 / .trim() => 각 끝에 있는 공백을 잘라냅니다.
  const rawSearchTerm = document.getElementById('search').value.trim();
  // 검색어 또는 구 내에서 2개 이상의 연속된 여러 공백(전역)을 찾음 => 정규식 표현
  const regex = /[ ]{2,}/gi;
  // 2개 이상의 연속된 공백을 단일 공백으로 대체 
  // replaceAll : 특정 문자 모두 바꾸기 👉 str.replaceAll("[{바꾸고싶은 문자의 정규식}]", "{치환할 문자}");
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');

  //검색어(공백을 잘 처리한) return 
  return searchTerm;
};

// 2. 검색결과를 정의, 데이터 배열 파일 받아옴.
export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm); // API에 전달해 검색문자열을 가져옴
  
  //검색결과 => 요청데이터가 인코딩한 wiki 검색 문자열에 전달 (try ~ catch문)
  const wikiSearchResults = await requestData(wikiSearchString);
  
  let resultArray = []; //데이터를 담을 빈배열 정의

  // 검색결과가 Property puery문에 담기면
  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processWikiResults(wikiSearchResults.query.pages); //최종 데이터
  }
  
  //배열은 비 배열이 있을 가능성 有
  return resultArray;
};

//3. wiki API 검색 문자열으로 정의
const getWikiSearchString = (searchTerm) => {
  // 우리가 받고 싶은 최대 문자수를 API에 알림
  const maxChars = getMaxChars();
  //wikipedia api 설정
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
 
  //wikipedia api에 추출된 데이터를 인코딩
  //URI 혹은 URL에 문자를 표현하는 인코딩 방식으로 RFC 3986에 따라서 알파벳이나 숫자 등 몇몇 문자를 제외한 문자들에 대해서 옥텟(octet) 값으로 묶어서 16진수 값으로 코딩하는 방식
  //encodeURI 👉 일반 문자열을 퍼센트 인코딩된 문자열로 변환
  const searchString = encodeURI(rawSearchString);

  return searchString;
};

// 4. window width에 따라 글자수 지정
const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  //브라우저 화면에 따라 글자수 제한
  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

// 5. 문자열에 전달하기 위해 도우미 함수
const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString); //응답을 정의 👉 응답을 가져오기 위한 요청결과를 기다림
    const data = await response.json(); // 응답을 얻음 👉 json메소드를 사용해 json으로 파싱 (문자 기반의 데이터 포맷)
    return data; // 데이터가 있으면 데이터를 반환
  } catch (err) {
    console.log(err);
  }
};

//6. 최종 데이터
const processWikiResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty('thumbnail')
      ? results[key].thumbnail.source
      : null;

    const item = {
      id: id,
      title: title,
      img: img,
      text: text,
    };

    resultArray.push(item);
  });
  return resultArray;
};
