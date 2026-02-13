import { prisma } from "../src/lib/prisma";

async function main() {
    // Create users
    const task1 = await prisma.user.upsert({
        where: {
            id: 1
        },
        update: {
            email: "user1@example.com",
            first_name: "John",
            last_name: "Doe",
            type: "STUDENT"
        },
        create: {
            id: 1,
            email: "user1@example.com",
            first_name: "John",
            last_name: "Doe",
            type: "STUDENT"
        }
    });

    const task2 = await prisma.user.upsert({
        where: {
            id: 2
        },
        update: {
            id: 2,
            email: "anexample@email.com",
            first_name: "Jane",
            last_name: "Smith",
            type: "STAFF"
        },
        create: {
            id: 2,
            email: "anexample@email.com",
            first_name: "Jane",
            last_name: "Smith",
            type: "STAFF"
        }
    });
    // create speakers
    const speaker1 = await prisma.speaker.upsert({
        where: {
            id: 1
        },
        update: {
            first_name: "Dr. Alice",
            last_name: "Johnson",
            bio: "Expert in theology and spirituality.",
            title: "Professor of Theology",
            type: "GUEST"
        },
        create: {
            id: 1,
            first_name: "Dr. Alice",
            last_name: "Johnson",
            bio: "Expert in theology and spirituality.",
            title: "Professor of Theology",
            type: "GUEST"
        }
    });

    const speaker2 = await prisma.speaker.upsert({
        where: {
            id: 2
        },
        update: {
            first_name: "Rev. Bob",
            last_name: "Smith",
            bio: "Experienced pastor and speaker.",
            title: "Senior Pastor",
            type: "STAFF"
        },
        create: {
            id: 2,
            first_name: "Rev. Bob",
            last_name: "Smith",
            bio: "Experienced pastor and speaker.",
            title: "Senior Pastor",
            type: "STAFF"
        }
    });

    // create chapel sessions
    const chapelSession1 = await prisma.chapelSession.upsert({
        where: {
            id: 1
        },
        update: {
            date: new Date("2024-01-15T10:00:00Z"),
            end_time: new Date("2024-01-15T11:00:00Z"),
            speaker_id: 1,
            number_standings: 5
        },
        create: {
            id: 1,
            date: new Date("2024-01-15T10:00:00Z"),
            end_time: new Date("2024-01-15T11:00:00Z"),
            speaker_id: 1,
            number_standings: 5
        }
    });

    const chapelSession2 = await prisma.chapelSession.upsert({
        where: {
            id: 2
        },
        update: {
            date: new Date("2024-02-20T14:00:00Z"),
            end_time: new Date("2024-02-20T15:00:00Z"),
            speaker_id: 2,
            number_standings: 3
        },
        create: {
            id: 2,
            date: new Date("2024-02-20T14:00:00Z"),
            end_time: new Date("2024-02-20T15:00:00Z"),
            speaker_id: 2,
            number_standings: 3
        }
    });

    // create feedbacks
    const feedback1 = await prisma.feedback.upsert({
        where: {
            id: 1
        },
        update: {
            response: "Great session! Very inspiring.",
            stars: 5,
            user_id: 1,
            chapel_session_id: 1
        },
        create: {
            id: 1,
            response: "Great session! Very inspiring.",
            stars: 5,
            user_id: 1,
            chapel_session_id: 1
        }
    });

    const feedback2 = await prisma.feedback.upsert({
        where: {
            id: 2
        },
        update: {
            response: "Informative but could be more engaging.",
            stars: 3,
            user_id: 1,
            chapel_session_id: 2
        },
        create: {
            id: 2,
            response: "Informative but could be more engaging.",
            stars: 3,
            user_id: 1,
            chapel_session_id: 2
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