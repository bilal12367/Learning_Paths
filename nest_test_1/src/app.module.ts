import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { UtilsModule } from './utils/utils.module';
@Module({
  imports: [CustomerModule, UtilsModule],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
