# 0-2 도커라이징 및 Cloud Run에 배포하기 **

---

## **1. 도커 설치 **
1. **docker desktop 설치**
   - docker.com에서 docker desktop 설치 및 실행

---

## **2. 도커라이징 **
1. **Dockerfile 정의**
   - 소스디렉토리에서 Dockerfile 만들기
     ```dockerfile
      # Use the official lightweight Node.js image.

      # https://hub.docker.com/_/node
      FROM node:22.13.0


      # Create and change to the app directory.
      WORKDIR /usr/src/app

      # Copy application dependency manifests to the container image.
      # A wildcard is used to ensure both package.json AND package-lock.json are copied.
      # Copying this separately prevents re-running npm install on every code change.
      COPY package*.json ./

      # Install dependencies.
      RUN npm ci

      # Copy local code to the container image.
      COPY . ./

      # Run the web service on container startup.
      ENTRYPOINT [ "npm", "run", "start" ]
     ```

2. **도커 빌드 및 실행**
   - 도커 빌드하기
    ```console
      docker build -t nest-lecture .
     ```
   - 빌드한 도커 서버 실행
     ```console
      docker run -p 3000:3000 nest-lecture
     ```

---

## **3. CLOUD RUN에 배포하기 **
1. **github에 배포하기**
   - GCP에 초대된 이메일 기반의 github에 각자 프로젝트를 main branch로 배포한다.

2. **CLOUD RUN 에 베포하기**
   - 저장소 연결 각자의 github에 연결
   - 브랜치 main, 빌드유형 /Dockerfile
   - 리전은 비용절감을 위해 오사카(asia-northeast2)로 설정
   - 인증되지 않은 호출 허용
   - Cloud SQL 연결 해놓기

3. **Hello Codelab 확인**
   - 생성된 Cloud Run 도메인에 접속하여 되는지 확인한다.
   - src/app.seervice.ts에서 문구를 바꿔서 github에 푸시해본다.
    ```ts
      return 'Hello Codelab!';
    ```
   - 자동으로 Cloud Run에 배포되는지 확인해보고 배포가 완료되면 서버에 접속하여 문구가 변경되었는지 확인


---

### 결과
도커 로컬 서버 실행 및 Cloud Run 서버 실행!
