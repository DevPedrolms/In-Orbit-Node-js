import { describe, it, expect } from 'vitest'
import { makeUser } from '../../tests/factories/make-user'
import { makeGoal } from '../../tests/factories/make-goal'
import { makeGoalCompletion } from '../../tests/factories/make-goal-completion'
import { getWeekPendingGoals } from './get-week-pending-goals'
import { getWeekSummary } from './get-week-summary'
import dayjs from 'dayjs'

describe('get week summary', () => {
  it('should be able a get a week summary', async () => {
    const user = await makeUser()

    const weekStartsAt = dayjs(new Date(2024, 10, 22))
      .startOf('week')
      .toDate()

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

    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(2, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal1.id,
      createdAt: dayjs(weekStartsAt).add(3, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal2.id,
      createdAt: dayjs(weekStartsAt).add(4, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(5, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(5, 'days').toDate(),
    })
    await makeGoalCompletion({
      goalId: goal3.id,
      createdAt: dayjs(weekStartsAt).add(3, 'days').toDate(),
    })

    const result = await getWeekSummary({
      userId: user.id,
      weekStartsAt,
    })

    expect(result).toEqual({
      summary: {
        completed: 6,
        total: 9,
        goalsPerDay: {
          '2024-11-22': expect.arrayContaining([
            expect.objectContaining({
              title: 'Ler docs',
            }),
            expect.objectContaining({
              title: 'Ler docs',
            }),
          ]),
          '2024-11-21': expect.arrayContaining([
            expect.objectContaining({
              title: 'correr',
            }),
          ]),
          '2024-11-20': expect.arrayContaining([
            expect.objectContaining({
              title: 'meditar',
            }),
            expect.objectContaining({
              title: 'Ler docs',
            }),
          ]),
          '2024-11-19': expect.arrayContaining([
            expect.objectContaining({
              title: 'meditar',
            }),
          ]),
        },
      },
    })
  })
})
