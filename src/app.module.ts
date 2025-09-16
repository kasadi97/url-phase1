import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
//import { RedirectController } from './redirect/redirect.controller';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [PrismaModule, UrlModule, RedirectModule],
  //controllers: [RedirectController],
  providers: [ PrismaService],
})
export class AppModule {}
