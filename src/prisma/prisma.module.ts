import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // делает модуль доступным во всем приложении
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // экспортируем, чтобы другие могли использовать
})
export class PrismaModule {}