import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RedirectController } from './redirect/redirect.controller';
import { RedirectModule } from './redirect/redirect.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UrlModule, RedirectModule, AuthModule],
  controllers: [RedirectController],
  providers: [ PrismaService],
})
export class AppModule {}
