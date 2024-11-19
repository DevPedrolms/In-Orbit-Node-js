import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'
import { authenticateUserHook } from '../hooks/authenticate-user'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      onRequest: [authenticateUserHook],
      schema: {
        tags: ['goals'],
        description: 'create a goal',
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
          userId: z.string(),
        }),
        reponse: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { title, desiredWeeklyFrequency, userId } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
        userId,
      })
      return reply.status(201).send()
    }
  )
}
