import bcrypt from 'bcrypt'
import prisma from '../src/lib/prisma'

async function main() {
  const plainPassword = 'demo'
  const hash = await bcrypt.hash(plainPassword, 10)

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: String(hash),
      name: 'Demo User'
    }
  })

  await prisma.task.createMany({
    data: [
      { title: 'First task', description: 'Welcome to Ka Globe', userId: user.id },
      { title: 'Second task', description: 'Example task', userId: user.id }
    ]
  })

  console.log('Seeded demo user: demo@example.com / demo')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
