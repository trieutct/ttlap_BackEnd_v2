import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());


  //setup cors
  const whiteList = process.env.CORS_WHITELIST;
  const corsOptions: CorsOptions = {
    origin:
      whiteList?.split(',')?.length > 1 ? whiteList.split(',') : whiteList,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Language',
      'X-Timezone',
      'X-Timezone-Name',
      'X-Mssp-Id',
      'X-Organization-Id',
    ],
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  };
  app.enableCors(corsOptions);


  
  await app.listen(3000);
  console.log('đang chạy cổng 3000');
}
bootstrap();
