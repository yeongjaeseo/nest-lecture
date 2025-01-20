# 0-3 TYPEORM으로 DB 연결 및 모듈 생성, 엔티티 생성**

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

## **3. 빌딩 모듈 및 엔티티 생성 **

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
3. **Entity 정의**
   - src/bldg/bldg.entity.ts를 생성한다.
   ```ts
   import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      } from 'typeorm';

      @Entity({ schema: 'seoyj', name: 'bldg' })
      export class Bldg {
      @PrimaryGeneratedColumn()
      bldg_id: number;

      @Column({ type: 'integer', nullable: false })
      bldg_sn: number;

      @Column({ type: 'integer', nullable: false })
      rds_sn: number;

      @Column({ type: 'text', nullable: false })
      sig_cd: string;

      @Column({ type: 'text', nullable: false })
      emd_cd: string;

      @Column({ type: 'text', nullable: true })
      lotno_addr: string;

      @Column({ type: 'text', nullable: true })
      road_nm_addr: string;

      @Column({ type: 'text', nullable: true })
      bldg_nm: string;

      @Column({ type: 'geometry', nullable: false })
      bldg_geom: string;

      @Column({ type: 'integer', nullable: true })
      gro_flo_co: number;

      @Column({ type: 'integer', nullable: true })
      und_flo_co: number;

      @Column({ type: 'text', nullable: false })
      bdtyp_cd: string;

      @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
      crt_dt: Date;

      @UpdateDateColumn({ type: 'timestamptz', nullable: true })
      mdfcn_dt: Date;

      @Column({ type: 'timestamptz', nullable: true, comment: '건물색 구별' })
      recent_poi_dtl_crt_dt: Date;
   }
   ```
   - 연결된 DB에 각자 이름의 스키마를 미리 생성한다.
   - 서버를 실행하면 각자 스키마에 엔티티로 정의한 테이블이 자동으로 생성된다.
   ```console
      npm run start:dev
   ```
   - synchronize true?
      •	새 엔터티가 추가되면 해당 테이블 생성
      •	기존 엔터티에 컬럼이 추가되거나 제거되면 테이블 구조 변경
      •	인덱스, 관계 등도 자동으로 업데이트, development에서만 사용.


---
