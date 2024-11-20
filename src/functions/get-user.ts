import { db } from '../db'
import { eq } from 'drizzle-orm'
import { users } from '../db/schema'

interface GetUserRequest {
  userId: string
}

export async function getUser({ userId }: GetUserRequest) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(eq(users.id, userId))

  const user = result[0]

  return {
    user,
  }
}
