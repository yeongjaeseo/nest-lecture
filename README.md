# 0-2 도커라이징 하기 **

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
      FROM node:22.13.0-slim


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

---
2. **도커 빌드**
   - 도커 빌드하기
    ```console
      docker build -t nest-lecture .
     ```
   - 빌드한 도커 서버 실행
     ```console
      nest-lecture % docker run -p 3000:3000
     ```
---

### 결과
도커 로컬 서버 실행 성공!
