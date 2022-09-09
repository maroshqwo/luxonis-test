import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import seeder from './properties';

const seedProperties = async () => {
  if ((await prisma.property.count()) > 0) {
    return;
  }

  const properties = seeder.map((property) => {
    return {
      name: property.name,
    };
  });

  await prisma.property
    .createMany({
      data: properties,
    })
    .then(() => {
      console.log('Properties Created!');
    });

  return properties;
};

const seedImages = async () => {
  if ((await prisma.image.count()) > 0) {
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

  await prisma.image
    .createMany({
      data: flatImages,
    })
    .then(() => {
      console.log('Images Created!');
    });

  return flatImages;
};

async function main() {
  seedProperties().then(() => {
    seedImages();
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
