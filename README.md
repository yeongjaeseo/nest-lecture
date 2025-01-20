# 0-4 Bldg 테이블의 모든 데이터 GET하는 API 만들기

---

## **1. Postman 설치**

1. **Postman 설치 후 localhost에 요청 테스트**
- [Postman 공식 웹사이트](https://www.postman.com)에서 Postman을 다운로드하고 설치합니다.
- Postman을 실행하고 아래와 같이 GET 요청을 테스트합니다:
```bash
GET localhost:3000
```

---

## **2. API 코드 작성**

### 1. **TypeOrmModule Import**
- `src/bldg.module.ts`에 `TypeOrmModule`을 Import하고 설정합니다:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BldgController } from './bldg.controller';
import { BldgService } from './bldg.service';
import { Bldg } from './bldg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bldg])],
  controllers: [BldgController],
  providers: [BldgService],
})
export class BldgModule {}
```

---

### 2. **Service 코드 작성**
- `src/bldg.service.ts`에 다음 코드를 추가하여 Service를 작성합니다:

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bldg } from './bldg.entity';

@Injectable()
export class BldgService {
  constructor(
    @InjectRepository(Bldg)
    private readonly bldgRepository: Repository<Bldg>,
  ) {}

  async findAll(): Promise<Bldg[]> {
    return this.bldgRepository.find();
  }
}
```

---

### 3. **Controller 코드 작성**
- `src/bldg.controller.ts`에 다음 코드를 추가하여 Controller를 작성합니다:

```typescript
import { Controller, Get } from '@nestjs/common';
import { BldgService } from './bldg.service';
import { Bldg } from './bldg.entity';

@Controller('bldg')
export class BldgController {
  constructor(private readonly bldgService: BldgService) {}

  @Get()
  async findAll(): Promise<Bldg[]> {
    return this.bldgService.findAll();
  }
}
```

---

## **3. 서버 실행 후 요청 테스트**

### 1. **서버 실행**
- 개발 모드에서 서버를 실행합니다:

```bash
npm run start:dev
```

### 2. **Postman에서 요청 테스트**
- Postman에서 다음 URL로 요청을 보냅니다:

```bash
GET localhost:3000/bldg
```
---

