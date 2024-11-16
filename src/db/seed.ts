import  { client, db } from "."
import { goalCompletions, goals } from "./schema"
import dayjs from "dayjs"

async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

    const result = await db.insert(goals).values([
        {title: "Acordar cedo", desiredWeeklyFrequency: 3},
        {title: "Estudar programação", desiredWeeklyFrequency: 5},
        {title: "Estudar Pentest", desiredWeeklyFrequency: 3},
    ]).returning()

    const startOffWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        {goalId:result[0].id, createdAt: startOffWeek.toDate() },
        {goalId:result[1].id, createdAt: startOffWeek.add(1, "day").toDate()},
        {goalId:result[2].id, createdAt: startOffWeek.add(3, "week").toDate()}
    ])
}


seed().finally(() => {
    client.end()
})