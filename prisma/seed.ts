import { prisma } from "../src/lib/prisma";

async function main() {
    // Create a task
    const task1 = await prisma.task.create({
        data: {
            title: "Test",
        }
    });

    const task2 = await prisma.task.create({
        data: {
            title: "Read the bible",
        }
    });

    const task3 = await prisma.task.create({
        data: {
            title: "Wash dishes",
        }
    });

    const user1 = await prisma.user.create({
        data: {
            email: "dillon.daughrity@students.fhu.edu",
            first_name: "Dillon",
            last_name: "Daughrity",
            user_type: "STUDENT",
        }
    });

    const user2 = await prisma.user.create({
        data: {
            email: "adam.hesselbacher@students.fhu.edu",
            first_name: "Adam",
            last_name: "Hesselbacher",
            user_type: "STUDENT",
        }
    });

    const user3 = await prisma.user.create({
        data: {
            email: "kcasey@fhu.edu",
            first_name: "Kenan",
            last_name: "Casey",
            user_type: "FACULTY",
        }
    });

    const speaker1 = await prisma.speaker.create({
        data: {
            first_name: "TJ",
            last_name: "Kirk",
            bio: "Vice President at FHU",
            title: "Mr.",
            type: "FACULTY",
        }
    });


    // const feedback1 = await prisma.feedback.create({
    //     data: {
    //         stars: 5,
    //         response: "Great job!",
    //         user_id: user1.id,
    //         chapel_session_id: 1,
    //     }
    // });
            
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