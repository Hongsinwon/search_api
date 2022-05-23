// 함수를 내보내기 위해 export 사용, 1개의 함수가 하나의 일만 수행하길 원함.

// 1. 검색 focus 설정
export const setSearchFocus = () => {
  document.getElementById('search').focus();
};

// 2. input 텍스트 작성시 clear icon 보이기
export const showClearTextButton = () => {
  const search = document.getElementById('search');
  const clear = document.getElementById('clear');
  if (search.value.length) {
    clear.classList.remove('none');
    clear.classList.add('flex');
  } else {
    clear.classList.add('none');
    clear.classList.remove('flex');
  }
};
