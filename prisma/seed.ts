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

    const speaker2 = await prisma.speaker.create({
        data: {
            first_name: "Luke",
            last_name: "Wamble",
            bio: "Former President of Chi Beta Chi",
            title: "Mr.",
            type: "ALUMNI",
        }
    });

    const speaker3 = await prisma.speaker.create({
        data: {
            first_name: "Robert",
            last_name: "Smith",
            bio: "Vice President of Chi Beta Chi",
            title: "Mr.",
            type: "STUDENT",
        }
    });

    const session1 = await prisma.chapelSession.create({
        data: {
            speaker_id: 1,
            topic: "Christian Love",
            scripture: "John 13:34-35",
            date: new Date("2024-09-01T10:30:00Z"),
            end_time: new Date("2024-09-01T10:58:34Z"),
            number_standings: 1,
        }
    })

    const session2 = await prisma.chapelSession.create({
        data: {
            speaker_id: 2,
            topic: "Faith in Action",
            scripture: "James 2:14-17",
            date: new Date("2024-09-08T10:30:00Z"),
            end_time: new Date("2024-09-08T10:59:48Z"),
            number_standings: 0,
        }
    })

    const session3 = await prisma.chapelSession.create({
        data: {
            speaker_id: 3,
            topic: "Overcoming Challenges",
            scripture: "Philippians 4:13",
            date: new Date("2024-09-15T10:30:00Z"),
            end_time: new Date("2024-09-15T11:01:02Z"),
            number_standings: 2,
        }
    })


    const feedback1 = await prisma.feedback.create({
        data: {
            stars: 5,
            response: "Great job!",
            user_id: user1.id,
            chapel_session_id: 1,
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