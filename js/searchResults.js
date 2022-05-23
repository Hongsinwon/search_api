// 검색결과 삭제
export const deleteSearchResults = () => {
  const parentElement = document.getElementById('searchResults');
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = (resultArray) => {
  // 검색결과를 배열에 전달 결과 배열을 사용하여 호출
  resultArray.forEach((result) => {
    const resultItem = creatsResultItem(result); //결과항목 생성 함수
    const resultContents = document.createElement('div'); //결과내용정의
    resultContents.classList.add('resultContents');

    if (result.img) {
      const resultImage = createResultImage(result);
      resultContents.append(resultImage);
    }
    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);

    const searchResults = document.getElementById('searchResults');
    searchResults.append(resultItem);
  });
};

// 페이지에 항목을 생성결과
const creatsResultItem = (result) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';
  resultTitle.append(link);
  resultItem.append(resultTitle);

  return resultItem;
};

// 이미지 생성
const createResultImage = (result) => {
  const resultImage = document.createElement('div');
  resultImage.classList.add('resultImage');
  const img = document.createElement('img');
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);

  return resultImage;
};

// 텍스트 생성
const createResultText = (result) => {
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('resultDescription');
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);

  return resultText;
};

// stats을 빈배열로
export const clearStatsLine = () => {
  document.getElementById('stats').textContent = '';
};

//검색결과
export const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById('stats');
  if (numberOfResults) {
    statLine.textContent = `검색결과 ${numberOfResults}개 검색되었습니다.`;
  } else {
    statLine.textContent = '검색결과가 존재하지 않습니다.';
  }
};
