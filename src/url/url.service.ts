import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async shortenUrlForUser(originalUrl:string, userId: number){
    const shortCode = nanoid(8);

    const url = await this.prisma.url.create({
      data: {
        originalUrl,
        shortCode,
        userId,  // ✅ сохраняем владельца
      },
    });

    return {
      shortUrl: `http://localhost:3000/${shortCode}`,
      originalUrl: url.originalUrl,
      userId: url.userId,
    };
  }

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

  async getStats(shortCode: string ){
    return this.prisma.url.findUnique({
      where: {shortCode},
      select:{
        originalUrl: true,
        shortCode: true,
        clicks: true,
        createdAt:true,
      },
    });
  }}
