# 0-6 Docker Compose로 로컬 개발 환경 설정

---

## **1. Compose 환경 만들기**

### 1. **개발환경에서 사용할 Dockerfile**
- `/Dockerfile.dev` 파일 생성
- `--watch` 모드를 사용하기 위해 Node.js를 slim 버전이 아닌 일반 버전으로 설정합니다.

#### Dockerfile.dev
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
ENTRYPOINT [ "npm", "run", "start:dev" ]
```

#### 설명
- **FROM**: Node.js 공식 이미지를 사용합니다. `22.13.0` 버전을 명시하여 환경 일관성을 유지합니다.
- **WORKDIR**: 컨테이너 내 작업 디렉토리를 `/usr/src/app`으로 설정합니다.
- **COPY**: 의존성 파일(`package.json`, `package-lock.json`)과 소스 코드를 복사합니다.
- **RUN npm ci**: 의존성을 설치합니다. `npm ci`는 `npm install`보다 더 빠르고 재현 가능한 설치를 보장합니다.
- **ENTRYPOINT**: 컨테이너가 시작될 때 `npm run start:dev`를 실행합니다.

---

### 2. **Docker Compose 설정**
- `/docker-compose.yml` 파일 생성

#### docker-compose.yml
```yaml
## 경고! 이 파일은 업로드하지 마세요! 중요한 비밀키들이 저장되어 있어요. 로컬 개발환경에서만 사용하세요! 
## WARNING! Do not upload this file! It contains important secret keys. Only use it in a local development environment!
version: '3'

services:
  # Service configuration for your application
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    image: nest-lecture-dev:local  # Names the built image
    ports:
      - "3002:3002"  # Maps the container port to the host
      - "9229:9229"
    environment:
      # Environment variables for the service
      NODE_ENV: development
      PORT: 3002
      K_SERVICE: nest-lecture
      K_REVISION: 0
      K_CONFIGURATION: nest-lecture
      CLOUDSQL_CONNECTION_NAME: winged-woods-442503-f1:asia-northeast3:codelab
      CLOUDSQL_USER: codelab
      CLOUDSQL_PASS: 비밀번호
      CLOUDSQL_HOST: 34.56.789.123
      CLOUDSQL_PORT: 5432
      CLOUDSQL_DB: codelab-nest
```

#### 설명
- **version**: Docker Compose 파일 버전을 나타냅니다. 버전 `3`은 최신 기능을 지원합니다.
- **services**: 애플리케이션 서비스를 정의하는 섹션입니다. 여기서는 `app`이라는 이름의 서비스가 정의되었습니다.
- **build**: Docker 이미지를 빌드하는 방법을 지정합니다.
  - `context`: 현재 디렉토리(`.`)를 빌드 컨텍스트로 사용합니다.
  - `dockerfile`: `Dockerfile.dev` 파일을 사용하여 이미지를 빌드합니다.
- **image**: 빌드된 이미지를 `nest-lecture-dev:local`로 태그합니다.
- **ports**: 컨테이너의 포트를 호스트와 매핑합니다.
  - `3002:3002`: 애플리케이션이 실행되는 포트를 매핑합니다.
  - `9229:9229`: 디버깅을 위해 Node.js 디버깅 포트를 열어줍니다.
- **environment**: 컨테이너 내에서 사용할 환경 변수를 정의합니다. 중요한 비밀키와 데이터베이스 연결 정보 등이 포함됩니다.


---

## **3. TypeORM 환경변수 보안화**

### 1. **기존 하드코딩 방식**
과거에는 TypeORM 설정을 하드코딩하여 데이터베이스 연결 정보를 명시적으로 코드에 작성했습니다. 이는 보안상 큰 위험을 초래할 수 있습니다.

#### 기존 방식 예제:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: '34.56.789.123',
  port: 5432,
  username: 'codelab',
  password: '비밀번호',
  database: 'codelab-nest',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
```

### 2. **환경변수로 보안 강화**
TypeORM 설정을 환경변수로 옮겨 민감한 정보를 보호하고, 개발/배포 환경에 따라 유연하게 설정할 수 있도록 변경했습니다.

#### 환경변수 사용 방식:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.CLOUDSQL_HOST,
  port: parseInt(process.env.CLOUDSQL_PORT, 10),
  username: process.env.CLOUDSQL_USER,
  password: process.env.CLOUDSQL_PASS,
  database: process.env.CLOUDSQL_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
```

- **이점**:
  - 민감한 정보를 코드에서 제거하여 보안 강화.
  - 환경에 따라 다른 값을 적용 가능 (로컬, 스테이징, 프로덕션).
  - Cloud Run 또는 다른 클라우드 플랫폼의 환경변수 관리와 쉽게 통합.

---

## **4. Cloud Run 환경변수 설정 (Google Secret Manager 사용)**

Google Secret Manager를 사용하면 민감한 정보를 안전하게 저장하고, Cloud Run에서 이를 환경변수로 설정할 수 있습니다.

### 1. **Google Secret Manager에 비밀 추가**
1. Google Cloud Console로 이동.
2. 왼쪽 메뉴에서 **Secret Manager** 선택.
3. **비밀 만들기(Create Secret)** 클릭.
4. 각 비밀을 추가합니다:
   - 이름: `CLOUDSQL_USER`, 값: `codelab`
   - 이름: `CLOUDSQL_PASS`, 값: `비밀번호`
   - 이름: `CLOUDSQL_HOST`, 값: `34.56.789.123`
   - 이름: `CLOUDSQL_PORT`, 값: `5432`
   - 이름: `CLOUDSQL_DB`, 값: `codelab-nest`

### 2. **Cloud Run에 Secret 연결**
1. Google Cloud Console에서 **Cloud Run** 서비스로 이동.
2. 배포할 서비스를 선택하고 **편집 및 배포(Edit and Deploy)**를 클릭.
3. **비밀(Environment Variables & Secrets)** 섹션에서 다음을 설정:
   - `CLOUDSQL_USER` → Secret Manager에서 `CLOUDSQL_USER` 선택.
   - `CLOUDSQL_PASS` → Secret Manager에서 `CLOUDSQL_PASS` 선택.
   - `CLOUDSQL_HOST` → Secret Manager에서 `CLOUDSQL_HOST` 선택.
   - `CLOUDSQL_PORT` → Secret Manager에서 `CLOUDSQL_PORT` 선택.
   - `CLOUDSQL_DB` → Secret Manager에서 `CLOUDSQL_DB` 선택.

### 3. **권한 부여**
Cloud Run이 Secret Manager에 접근할 수 있도록 서비스 계정에 필요한 권한을 부여합니다:
```bash
gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member="serviceAccount:<SERVICE_ACCOUNT>" \
  --role="roles/secretmanager.secretAccessor"
```

- `<PROJECT_ID>`: 프로젝트 ID.
- `<SERVICE_ACCOUNT>`: Cloud Run 서비스 계정 이메일.

---

## **5. 서버 실행 후 요청 테스트**

### 1. **서버 실행**
- Docker Compose로 서버를 실행합니다:
```bash
docker compose up
```

### 2. **Postman에서 요청 테스트**
- Postman에서 다음 URL로 요청을 보냅니다:

```bash
GET localhost:3002/bldg/nearby?x=126.888923&y=37.480935&radius=10
```

### 3. **git push 후 실제 서버 테스트**
- Postman에서 다음 URL로 요청을 보냅니다:

```bash
GET {serverUrl}/bldg/nearby?x=126.888923&y=37.480935&radius=10
```

---

#### 중요!!!
- **`docker-compose.yml` 파일을 `.gitignore`에 반드시 추가하세요.**
  - 이 파일에는 민감한 정보(예: 데이터베이스 비밀번호)가 포함될 수 있으므로, 절대로 깃에 커밋되면 안 됩니다.
