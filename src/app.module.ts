import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.moudule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auht.module';

@Module({
  imports: [ProductModule,UserModule,AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/local'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
