# 0-3 TYPEORM으로 DB 연결 및 모듈 생성**

---

## **1. 패키지 설치 **
1. **pg, typeORM 설치**
   - 필요한 패키지 설치
     ```console
      npm i pg typeorm @nestjs/typeorm
     ```

---

## **2. typeORM 연결 **
1. **typeOrmModule Import**
   - src/app.module.ts에 typeOrmModule import
     ```ts
      import { Module } from '@nestjs/common';
      import { AppController } from './app.controller';
      import { AppService } from './app.service';
      import { TypeOrmModule } from '@nestjs/typeorm';
      import { BldgModule } from './bldg/bldg.module';

      @Module({
      imports: [
         TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'seoyj',
            password: '1234',
            database: 'codelab-nest',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
         }),
         BldgModule,
      ],
      controllers: [AppController],
      providers: [AppService],
      })
      export class AppModule {}
     ```

---

## **3. 빌딩 모듈 생성 **

1. **빌딩 모듈 생성**
   - 빌딩 모듈, 컨트롤러, 서비스를 nest cli로 생성
    ```console
      nest g module bldg
      nest g controller bldg
      nest g service bldg
    ```
   - controller : 요청을 처리하고 응답하는 역할
   - service : controller 메서드에 따라 해당하는 DB 작업 로직

2. **컨트롤러에 서비스 연결**
   - 서비스 사용을 위해 컨트롤러에 서비스 주입
   - src/bldg/bldg.controller.ts
    ```ts
      import { Controller } from '@nestjs/common';
      import { BldgService } from './bldg.service';

      @Controller('bldg')
      export class BldgController {
      constructor(private bldgService: BldgService) {}
      }
    ```


---

### 결과
TypeOrm 연결 및 모듈 생성
