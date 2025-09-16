import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],  // теперь видит PrismaService
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService], // чтобы RedirectModule мог использовать UrlService
})
export class UrlModule {}
