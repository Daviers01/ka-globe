import prisma from '../src/lib/prisma'

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: '$2b$10$demo', // replace with bcrypt hash in real seed
      name: 'Demo User'
    }
  })

  await prisma.task.createMany({
    data: [
      { title: 'First task', description: 'Welcome to Ka Globe', userId: user.id },
      { title: 'Second task', description: 'Example task', userId: user.id }
    ]
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
