<b>[바닐라 자바스크립트]  📆 2022.05.20 ~ 2022.05.25

[참고 인강] - https://youtu.be/Dk6Wopar10k


# Wikipedia API를 이용한 구글 검색 클론 코딩

</br>

## 프로젝트 설명 · 기능
> Wikipedia API 를 이용해 google과 동일한 디자인으로 검색을 20개씩 List로 출력해 출련된 링크가 위키백과로 연결되게 잔행하였습니다.
  
  
  </br>
  
## 사용한 기술
  1. HTML5
  2. CSS3
  3. Vanilla Javascript
  4. Wikipedia API


</br>

## 느낌점
> 간결하고 가독성이 좋은 코드가 무엇인지 이 프로젝트를 진행하면서 알게되었다.
> 
> 다소 부족했던 자바스크립트의 개념을 한단계 더 알았고 더 나아가 배운것을 통하여 React.js로 만들어 보는 기회도 조만간 마련할 생각이다. 이번 작업은 내가 만든 스터디를 위해 선행학습으로 진행하였는데 같이 하고자 하는 이들과 함께 발전된 모습을 그리며 평소보다 더 열심히 진행하였다. 
> 
> 그리고 세상엔 많은 개발자와 능력이 있는 이들도 있고 나처럼 배우는 이들도 많다는 것을 알게되었다.


</br>

##  Problem (문제가 되는 것 + 해결 + 이론 )

1. 로컬에서 CORS policy 관련 에러가 발생하는 이유

>Access to script at 'file:///C:/경로/js/module.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.


</br>

🔥 로컬에서 CORS가 발생한 이유.

 ```javascript
    <script type="module" src="js/module.js"></script>
 ```
 
 </br>
 
🌟<script type=module>의 특성 
  
 > [MDN 참고 문서 - https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules]
 >
 > type을 module로 설정한<script> 태그가 포함된 HTML 파일을 로컬에서 로드할 경우 자바스크립트 모듈 보안 요구사항으로 인해 CORS 오류가 발생한다고 합니다. 그 때문에 ajax로 요청한 것임 아님에도 불구하고 CORS 오류가 발생
  
   </br>
  
 ##### 🙌 해결방법 
  
 1. 터미널을 켜서 해당 http-server을 전역으로 설치해 줍니다.
  
   ```javascript
   npm install http-server -g
 ```
  
 </br>
    
 2. 명령어로 http-server를 실행시켜 해당 폴더를 서버에 올립니다.

  ```javascript
   npx http-server
 ```
 
  </br>
  
  3. URI로 접속해서 에러가 사라진 것을 확인합니다.

  ```javascript
   http://127.0.0.1:8080
 ```
 
   </br>
   
   🚨 코드를 수정했는데 수정되지 않은 이전버전으로 나온다면 ?!
   
  ```javascript
   http-server -c-1
 ```
 
 > -c캐시 시간(max-age)을 초 단위로 나타내는 옵션 이 있습니다. (예: -c1010초 동안)
 > 캐시를 비활성화하여 캐시시간을 1초마다 나타내는 방법으로 진행하였습니다.

</br>

--------------------------------------------
   
   </br>

 ## 완성된 페이지
 
 #### 1. 메인 (검색하지 않은 메인화면)
![메인](image/main1.png)

#### 2. 메인 (검색을 진행한 메일화면)
![메인](image/main2.png)
