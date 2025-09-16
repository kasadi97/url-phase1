import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { UrlModule } from '../url/url.module';

@Module({
  imports: [UrlModule],  // чтобы UrlService был доступен
  controllers: [RedirectController],
})
export class RedirectModule {}
