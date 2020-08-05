import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import config from "./config"

import { logger } from './core/middlewares/logger.middleware'
import { ErrorExceptionFilter } from "./core/filters/error-exception.filter";

import * as rateLimit from 'express-rate-limit' // request rate
import { DocumentBuilder,SwaggerModule} from '@nestjs/swagger' // swagger

import { Logger } from './common/utils/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(logger); // log middleware
  app.useGlobalFilters(new ErrorExceptionFilter()) // filter error exception

  app.use(
    rateLimit({
      windowMs:15*60*1000,
      max:100
    }
  ))

  const API_PREFIX = 'api'
  app.setGlobalPrefix(API_PREFIX) // 设置api前缀 /api/xxxx
  // 创建 swagger 文档
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nestjs API')
    .setDescription('nestjs-swagger-document')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('/swagger',app,document)

  await app.listen(config.port,config.hostName,()=>{
    Logger.log(
      `nest-hello-world API server has been started on http://${config.hostName}:${config.port}`,
    )
  });
}
bootstrap();
