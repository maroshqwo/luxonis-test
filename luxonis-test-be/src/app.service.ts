import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import seeder from './properties';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async populateProperties() {
    if ((await this.prisma.property.count()) > 0) {
      return;
    }

    const properties = seeder.map((property) => {
      return {
        name: property.name,
      };
    });

    await this.prisma.property
      .createMany({
        data: properties,
      })
      .then(() => {
        console.log('Properties Created!');
      });

    return properties;
  }

  async populateImages() {
    if ((await this.prisma.image.count()) > 0) {
      return;
    }

    const images = seeder.map((images, index) => {
      const temp = seeder[index].images.map((image) => {
        return {
          url: image,
          propertyId: index + 1,
        };
      });
      return temp;
    });

    const flatImages = images.flat();

    await this.prisma.image
      .createMany({
        data: flatImages,
      })
      .then(() => {
        console.log('Images Created!');
      });

    return flatImages;
  }

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
