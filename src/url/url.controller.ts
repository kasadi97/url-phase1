import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shorten(@Body('originalUrl') originalUrl: string) {
    return this.urlService.shortenUrl(originalUrl);
  }

  @Get('stats/:shortCode')
  async getStats(@Param('shortCode') shortCode: string){
    return this.urlService.getStats(shortCode)
  }
}
