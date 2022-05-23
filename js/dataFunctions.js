// 함수를 내보내기 위해 export 사용, 1개의 함수가 하나의 일만 수행하길 원함.

// 1. 검색어를 가져져오기
export const getSearchTerm = () => {
  // .value => 텍스트 상자에서 값을 가져오고 / .trim() => 각 끝에 있는 공백을 잘라냅니다.
  const rawSearchTerm = document.getElementById('search').value.trim();
  // 검색어 또는 구 내에서 2개 이상의 연속된 공백을 찾음 => 정규식 표현
  const regex = /[ ]{2,}/gi;
  // 2개 이상의 연속된 공백을 단일 공백으로 대체
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');

  //검색어 return
  return searchTerm;
};

// 2. 검색결과를 정의, 데이터 배열 파일 받아옴.
export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm);
  //검색결과 => 요청데이터가 인코딩한 wiki 검색 문자열에 전달
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = []; //빈배열 정의

  if (wikiSearchResults.hasOwnProperty('query')) {
    //json에 query값이 있는경우
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }

  return resultArray;
};

//3. wiki 검색 문자열으로 정의
const getWikiSearchString = (searchTerm) => {
  // 우리가 받고 싶은 최대 문자수를 API에 알림
  const maxChars = getMaxChars();
  //wikipedia api 설정
  const rawSearchString = `https://ko.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  //wikipedia api에 추출된 데이터를 인코딩
  const searchString = encodeURI(rawSearchString);

  return searchString;
};

// 4. window width에 따라 글자수 지정
const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

// 5. 문자열에 전달하기 위해 도우미 함수
const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
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
