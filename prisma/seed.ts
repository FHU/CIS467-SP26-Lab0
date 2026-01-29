import { prisma } from "../src/lib/prisma";

async function main() {
    // Create a task
    const task1 = await prisma.task.create({
        data: {
            id: 1,
            title: "Fold laundry",
        }
    });

    const task2 = await prisma.task.create({
        data: {
            id: 2,
            title: "Read the bible",
        }
    });

    const task3 = await prisma.task.create({
        data: {
            id: 3,
            title: "Wash dishes",
        }
    });

    console.log("Seed complete");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });