import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async shortenUrl(originalUrl: string) {
    // 1. Генерация короткого кода
    const shortCode = nanoid(8); // короткий код длиной 8 символов

    // 2. Сохранение в БД
    const url = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    // 3. Возврат полного укороченного URL
    return {
      shortUrl: `http://localhost:3000/${shortCode}`,
      originalUrl: url.originalUrl,
    };
  }

  async findByShortCode(shortCode: string) {
    return this.prisma.url.findUnique({
      where: { shortCode },
    });
}
    async incrementClicks(shortCode: string) {
    return this.prisma.url.update({
      where: { shortCode },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }

}
