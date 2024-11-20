import { faker } from '@faker-js/faker'

import { db } from '../../src/db'
import { goalCompletions } from '../../src/db/schema'
import type { InferSelectModel } from 'drizzle-orm'

export async function makeGoal(
  override: Partial<InferSelectModel<typeof goalCompletions>> &
    Pick<InferSelectModel<typeof goalCompletions>, 'goalId'>
) {
  const [result] = await db.insert(goalCompletions).values(override).returning()

  return result
}
