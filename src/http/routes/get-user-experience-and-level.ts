import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUser } from '../../functions/get-user'
import { authenticateUserHook } from '../hooks/authenticate-user'
import { getUserLevelAndExperience } from '../../functions/get-user-level-and-experience'

export const getUserExperienceAndLevelRoute: FastifyPluginAsyncZod =
  async app => {
    app.post(
      '/profile/gamification',
      {
        onRequest: [authenticateUserHook],
        schema: {
          tags: ['auth', 'gamification'],
          description: 'Get user experience and level',
          reponse: {
            200: z.object({
              experience: z.number(),
              level: z.number(),
              experienceToNextLevel: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = request.user.sub

        const { level, experience, experienceToNextLevel } =
          await getUserLevelAndExperience({
            userId,
          })
        return reply
          .status(201)
          .send({ experience, level, experienceToNextLevel })
      }
    )
  }
