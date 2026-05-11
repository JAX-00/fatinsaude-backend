import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@saude.gov.tl';
  const adminPassword = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrator',
      role: Role.ADMIN,
    },
  });

  console.log({ admin });

  const districts = [
    { name: 'Dili', lat: -8.55, lng: 125.57 },
    { name: 'Baucau', lat: -8.46, lng: 126.45 },
    { name: 'Liquica', lat: -8.59, lng: 125.33 },
    { name: 'Ermera', lat: -8.72, lng: 125.43 },
  ];

  for (const d of districts) {
    await prisma.district.upsert({
      where: { name: d.name },
      update: { latitude: d.lat, longitude: d.lng },
      create: { name: d.name, latitude: d.lat, longitude: d.lng },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
