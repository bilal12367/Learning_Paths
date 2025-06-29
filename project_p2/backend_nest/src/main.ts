import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './api/auth/auth.guard';
import { JwtService } from './jwt/jwt.service';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
  app.use(cookieParser())
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)))

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
