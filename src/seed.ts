import { faker } from '@faker-js/faker';

import prisma from './prismaClient';

async function main() {
  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.position.deleteMany();

  // Create positions
  const positions = ['Manager', 'Developer', 'Designer', 'QA', 'HR'];

  const createdPositions = await Promise.all(
    positions.map((position) =>
      prisma.position.create({
        data: {
          name: position
        }
      })
    )
  );

  // Create 45 users
  for (let i = 0; i < 45; i++) {
    const position = createdPositions[Math.floor(Math.random() * createdPositions.length)];

    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        phone: faker.phone.number('+380#########'),
        position_id: position.id,
        photo: faker.image.avatar()
      }
    });
  }

  console.log('Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
