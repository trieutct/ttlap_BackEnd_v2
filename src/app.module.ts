import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.moudule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductModule,
    MongooseModule.forRoot('mongodb+srv://trinhcongtrieu2972002:trieutct@cluster0.etugg8t.mongodb.net/'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
