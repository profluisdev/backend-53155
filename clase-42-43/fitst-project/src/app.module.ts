import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot("mongodb+srv://admin:admin123456@e-commerce.vn9a3yh.mongodb.net/nest")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
