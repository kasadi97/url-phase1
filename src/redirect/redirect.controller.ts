import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { UrlService } from '../url/url.service';

@Controller()
export class RedirectController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlService.findByShortCode(shortCode);

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    // увеличиваем количество кликов
    await this.urlService.incrementClicks(shortCode);

    return res.redirect(url.originalUrl);
  }
}
