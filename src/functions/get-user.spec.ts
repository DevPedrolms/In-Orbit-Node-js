import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '../db'
import { users } from '../db/schema'
import { getUser } from './get-user'
import { eq } from 'drizzle-orm'

describe('get user', () => {
  beforeEach(async () => {
    await db.delete(users).where(eq(users.id, 'jhon-doe'))
  })

  it('should be able to get a user', async () => {
    await db.insert(users).values({
      id: 'jhon-doe',
      avatarUrl: 'https://github.com/diego3g.png',
      externalAccountId: 123456789,
    })

    const result = await getUser({ userId: 'jhon-doe' })

    expect(result).toEqual({
      user: {
        id: 'jhon-doe',
        name: null,
        email: null,
        avatarUrl: 'https://github.com/diego3g.png',
      },
    })
  })
})
