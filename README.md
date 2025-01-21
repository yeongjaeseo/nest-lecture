# 0-5 주변건물조회 API 만들기

---

## **1. DTO 만들기**

1. **DTO 정의**
- class-validator를 설치한다.
- class-validator는 Node.js 환경에서 데이터 유효성 검사를 수행하기 위한 라이브러리로, 클래스 기반의 객체를 정의하고 그 객체의 속성 값들이 특정 조건을 만족하는지 검사할 수 있습니다. 주로 NestJS와 함께 사용되며, DTO(Data Transfer Object)와 연계해 클라이언트로부터 전달된 데이터를 검증하는 데 자주 활용됩니다.
```bash
npm i class-validator
```
- bldg/dto/bldg-nearby-dto.ts 파일을 생성한다.
```ts
import { IsNumber } from 'class-validator';

export class BldgNearbyDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  radius: number;
}
```

---

## **2. service, controller 정의**

### 1. **service 코드 작성**
- src/bldg/bldg.service.ts에 아래 코드 추가
```typescript
async findNearby(x: number, y: number, radius: number): Promise<Bldg[]> {
    return this.bldgRepository
      .createQueryBuilder('bldg')
      .where(
        `ST_Distance(
           ST_SetSRID(ST_MakePoint(:x, :y), 4326)::geography, 
           bldg.bldg_geom::geography
         ) <= :radius`,
        { x, y, radius },
      )
      .getMany();
  }
```
- 4326 geometry는 degree단위이므로 geography로 변환하여 meter단위로 radius 사용
---

### 2. **Controller 코드 작성**
- `src/bldg/bldg.controller.ts`에 다음 코드를 추가하여 Controller를 작성합니다:
```typescript
  @Get('nearby')
  async findNearby(@Query() query: BldgNearbyDto): Promise<Bldg[]> {
    return this.bldgService.findNearby(query.x, query.y, query.radius);
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
GET localhost:3002/bldg/nearby?x=126.888923&y=37.480935&radius=10
```
---

