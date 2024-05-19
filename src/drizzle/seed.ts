import { isNull } from "drizzle-orm"
import { db } from "."
import { transactionCategories } from "./schema"

const seed = async () => {
    console.log('Start Seeding...')
    try {
        // seed categories
        const categoryExist = await db.select().from(transactionCategories).where(isNull(transactionCategories.userId))
        if (categoryExist.length == 0) {
            const categories = [
                { name: 'General' },
                { name: 'Food' },
                { name: 'Transportation' },
                { name: 'Entertainment' },
                { name: 'Shopping' },
            ]
            await db.insert(transactionCategories).values(categories);
        }

        console.log('Seeding done!')
    } catch (error) {
        console.warn('Seeding failed!')
        console.error(error)
    }
    process.exit()
}

seed()