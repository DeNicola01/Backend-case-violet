import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmersModule } from './farmers/farmers.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/farmer-db'),
    FarmersModule,
  ],
})
export class AppModule {}
