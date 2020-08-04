import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserModule } from './features/user/user.module'


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'blu_ray',
      synchronize: true,
      entities: ['dist/**/*.entity{ .ts,.js}'], // mapping class
      migrations: ['dist/shared/migration/**/*.ts'], // 存放数据库版本管控(migration)的目录
      charset: 'utf8mb4'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
