import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import {
  getAccessTokenFromCode,
  getUserFromAcessToken,
} from '../modules/github-oauth'
import { authenticateUser } from '../modules/auth'

interface authenticateFromGithubcodeRequest {
  code: string
}

export async function authenticateFromGithubCode({
  code,
}: authenticateFromGithubcodeRequest) {
  const accessToken = await getAccessTokenFromCode(code)
  const githubUser = await getUserFromAcessToken(accessToken)

  const result = await db
    .select()
    .from(users)
    .where(eq(users.externalAccountId, githubUser.id))

  let userId: string | null

  const userAlredyExists = result.length > 0

  if (userAlredyExists) {
    userId = result[0].id
  } else {
    const [insertedUser] = await db
      .insert(users)
      .values({
        name: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatar_url,
        externalAccountId: githubUser.id,
      })
      .returning()

    userId = insertedUser.id
  }

  const token = await authenticateUser(userId)

  return { token }
}
