import { client, db } from '.'
import { goalCompletions, goals, users } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const [user] = await db
    .insert(users)
    .values({
      name: 'jhon Dee',
      externalAccountId: 38734702,
      avatarUrl: 'https://github.com/diego3g.png',
    })
    .returning()

  const result = await db
    .insert(goals)
    .values([
      { userId: user.id, title: 'Acordar cedo', desiredWeeklyFrequency: 3 },
      {
        userId: user.id,
        title: 'Estudar programação',
        desiredWeeklyFrequency: 5,
      },
      { userId: user.id, title: 'Estudar Pentest', desiredWeeklyFrequency: 3 },
    ])
    .returning()

  const startOffWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOffWeek.toDate() },
    { goalId: result[1].id, createdAt: startOffWeek.add(1, 'day').toDate() },
    { goalId: result[2].id, createdAt: startOffWeek.add(3, 'week').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
