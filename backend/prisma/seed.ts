import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const sample = [
    { title: 'Inception', type: 'Movie', director: 'Christopher Nolan', budget: '$160M', location: 'LA, Paris', duration: '148 min', year: '2010', notes: 'Mind-bending' },
    { title: 'Breaking Bad', type: 'TV Show', director: 'Vince Gilligan', budget: '$3M/ep', location: 'Albuquerque', duration: '49 min/ep', year: '2008-2013', notes: 'Top-tier TV' }
  ]

  for (const s of sample) {
    await prisma.entry.create({ data: s as any })
  }

  for (let i = 1; i <= 40; i++) {
    await prisma.entry.create({
      data: {
        title: `Sample Movie ${i}`,
        type: 'Movie',
        director: `Dir ${i}`,
        budget: '$1M',
        location: 'City',
        duration: '100 min',
        year: '2000'
      }
    })
  }

  console.log('Seed complete')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
