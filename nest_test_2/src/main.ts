import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthorizationExceptionFilter } from './common/filters/AuthorizationExceptionFilter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AuthorizationExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
