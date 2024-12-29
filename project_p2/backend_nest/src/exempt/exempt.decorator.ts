import { SetMetadata } from '@nestjs/common';

export const ExemptRoute = (...args: string[]) => SetMetadata('exempt', true);
