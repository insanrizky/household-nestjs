import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from 'src/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import MongoConfigService from 'src/configs/mongo';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
