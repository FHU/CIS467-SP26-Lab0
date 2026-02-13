import { UserType } from "../src/generated/prisma/enums";
import { prisma } from "../src/lib/prisma";

async function main() {
    // Create a feedback entry
    const user1 = await prisma.user.create({
        data: {
            id: 1,
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            user_type: UserType.ALUMNI
        }
    });

    const user2 = await prisma.user.create({
        data: {
            id: 2,
            first_name: "Jane",
            last_name: "Smith",
            email: "jane.smith@example.com",
            user_type: UserType.STUDENT
        }
    });

    const chapelSession = await prisma.chapelSession.create({
        data: {
            id: 1,
            date: new Date("2024-09-01"),
            topic: "Welcome Back!",
            speaker_id: 3,
            number_standings: 2,
            end_time: new Date("2024-09-01T10:00:00Z"),
            scripture: "John 3:16"
        }
    });

    const speaker = await prisma.speaker.create({
        data: {
            id: 3,
            first_name: "Allen",
            last_name: "Johnson",
            title: "Dr.",
            user_type: UserType.FACULTY,
            chapel_session: {
                connect: { id: chapelSession.id }
            }
        }
    });

    const feedback1 = await prisma.feedback.create({
        data: {
            id: 1,
            user_id: user1.id,
            speakerId: speaker.id,
            chapel_session_id: chapelSession.id,
            stars: 5,
            response: "Great session!"
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