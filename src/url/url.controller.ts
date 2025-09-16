import { Body, Controller, Post, } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shorten(@Body('originalUrl') originalUrl: string) {
    return this.urlService.shortenUrl(originalUrl);
  }
}
