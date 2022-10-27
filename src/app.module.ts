import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ClaimModule } from './claim/claim.module';
import MongoConfigService from './configs/mongo';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ClaimModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
