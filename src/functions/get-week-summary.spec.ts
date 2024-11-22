import { describe, it, expect } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { getWeekPendingGoals } from './get-week-pending-goals'
import { getWeekSummary } from './get-week-summary'

describe('get week summary', () => {
  it('should be able a get a week summary', async () => {
    const user = await makeUser()

    const goal1 = await makeGoal({
      userId: user.id,
      title: 'meditar',
      desiredWeeklyFrequency: 3,
    })
    const goal2 = await makeGoal({
      userId: user.id,
      title: 'correr',
      desiredWeeklyFrequency: 2,
    })
    const goal3 = await makeGoal({
      userId: user.id,
      title: 'Ler docs',
      desiredWeeklyFrequency: 4,
    })

    await makeGoalCompletion({ goalId: goal1.id })
    await makeGoalCompletion({ goalId: goal1.id })
    await makeGoalCompletion({ goalId: goal2.id })
    await makeGoalCompletion({ goalId: goal3.id })
    await makeGoalCompletion({ goalId: goal3.id })
    await makeGoalCompletion({ goalId: goal3.id })

    const result = await getWeekSummary({
      userId: user.id,
    })

    console.log(result)

    // expect(result).toEqual({
    //   pendingGoals: expect.arrayContaining([
    //     expect.objectContaining({
    //       title: 'meditar',
    //       desiredWeeklyFrequency: 3,
    //       completionCount: 2,
    //     }),
    //     expect.objectContaining({
    //       title: 'correr',
    //       desiredWeeklyFrequency: 2,
    //       completionCount: 1,
    //     }),
    //     expect.objectContaining({
    //       title: 'Ler docs',
    //       desiredWeeklyFrequency: 4,
    //       completionCount: 3,
    //     }),
    //   ]),
    // })
  })
})
