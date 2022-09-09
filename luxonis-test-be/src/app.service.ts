import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getProperties(page: number) {
    const properties = await this.prisma.property.findMany({
      skip: (page - 1) * 24,
      take: 24,
      include: {
        images: true,
      },
    });
    return properties;
  }

  async getPropertiesCount() {
    const count = await this.prisma.property.count();
    return count;
  }
}
