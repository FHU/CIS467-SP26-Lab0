import { prisma } from "../src/lib/prisma";

async function main() {
    // Create a task
    const task1 = await prisma.task.upsert({
        where: {
            id: 1
        },
        update: {
            title: "Fold laundry",
            completed: false
        },
        create: {
            id: 1,
            title:"Fold laundry"
        }
    });

    const task2 = await prisma.task.upsert({
        where: {
            id: 2
        },
        update: {
            title: "Read the bible",
            completed: false
        },
        create: {
            id: 2,
            title: "Read the bible"
        }
    });

    const task3 = await prisma.task.upsert({
        where: {
            id: 3
        },
        update: {
            title: "Wash dishes",
            completed: false
        },
        create: {
            id: 3,
            title: "Wash dishes"
        }
    });

    const task4 = await prisma.task.upsert({
        where: {
            id: 4
        },
        update: {
            title: "Buy groceries",
            completed: true
        },
        create: {
            id: 4,
            title: "Buy groceries",
            completed: true
        }
    });

    const task5 = await prisma.task.upsert({
        where: {
            id: 5
        },
        update: {
            title: "Walk the dog",
            completed: false
        },
        create: {
            id: 5,
            title: "Walk the dog"
        }
    });

    const task6 = await prisma.task.upsert({
        where: {
            id: 6
        },
        update: {
            title: "Pay bills",
            completed: true
        },
        create: {
            id: 6,
            title: "Pay bills",
            completed: true
        }
    });

    const task7 = await prisma.task.upsert({
        where: {
            id: 7
        },
        update: {
            title: "Call mom",
            completed: false
        },
        create: {
            id: 7,
            title: "Call mom"
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