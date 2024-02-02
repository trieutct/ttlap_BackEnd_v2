import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.moudule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auht.module';
@Module({
  imports: [ProductModule,UserModule,AuthModule,
    MongooseModule.forRoot('mongodb+srv://trinhcongtrieu2972002:trieutct@trieu.q6n63sn.mongodb.net/'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
