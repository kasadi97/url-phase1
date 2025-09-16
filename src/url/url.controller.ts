import { Body, Controller, Get, Param, Post, Req, UseGuards, } from '@nestjs/common';
import { UrlService } from './url.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('shorten-user')
  async shorten(@Body('originalUrl') originalUrl: string, @Req() req) {
    //req.user -- object that returns jwtStrategy.validate()
    const user = req.user;
    return this.urlService.shortenUrlForUser(originalUrl, user.id);
  }

  @Get('stats/:shortCode')
  async getStats(@Param('shortCode') shortCode: string){
    return this.urlService.getStats(shortCode)
  }
}
