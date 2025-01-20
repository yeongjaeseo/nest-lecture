# 0-1 NESTJS 프로젝트 생성 **

---

## **1. 프로젝트 생성 **
1. **cli 설치 및 프로젝트 생성, 필요 패키지 설치**
   - 터미널에서 아래 명령어 실행
     ```console
      npm i -g @nestjs/cli
      nest new nest-lecture
     ```

---
2. **서버 실행해보기**
   - src/main.ts에 bootstrap 하단에 코드 추가
     ```ts
      console.log(`Application is running on: ${await app.getUrl()}`);
     ```
   - 로컬 서버 실행해보기
    ```console
      npm run start
     ```
---

### 결과
로컬 서버 실행 성공!
