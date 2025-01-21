import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BldgModule } from './bldg/bldg.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '아이피주소',
      port: 5432,
      username: 'codelab',
      password: '비밀번호',
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
