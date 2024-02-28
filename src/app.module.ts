import { Module,OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.moudule';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auht.module';
import { seedService } from './seed/seed.service';
import { config } from 'dotenv';
config()
@Module({
  imports: [ProductModule,UserModule,AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DATABASE_CONNECTION_STRING),],
  controllers: [AppController],
  providers: [AppService,seedService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: seedService) {}

  async onModuleInit() {
    await this.seederService.seedData();
  }
}
