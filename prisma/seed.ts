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

    const speaker1 = await prisma.speaker.upsert({
        where: {
            id: 5
        },
        update: {
            bio: "The president of Freed",
            first_name: "David",
            last_name: "Shannon",
            title: "president"
        },
        create:
        {
            bio: "The president of Freed",
            first_name: "David",
            last_name: "Shannon",
            title: "president" 
        }
    });

    const speaker2 = await prisma.speaker.upsert({
        where: {
            id: 9
        },
        update: {
            bio: "A professor at Freed",
            first_name: "Kenan",
            last_name: "Casey",
            title: "Dr."
        },
        create:
        {
            bio: "A professor at Freed",
            first_name: "Kenan",
            last_name: "Casey",
            title: "Dr."
        }
    });

    const session1 = await prisma.chapelSession.upsert({
        where: {
            id: 5
        },
        update: {
            speaker_id: speaker2.id,
            topic: "Love one another",
            scripture: "Matthew 5:11",
            date: new Date("2025-08-24"),
            end_time: new Date("2025-08-24T11:24:00"),
            number_standing: 4 
        },
        create:
        {   
            id: 5,
            speaker_id: speaker2.id,
            topic: "Love one another",
            scripture: "Matthew 5:11",
            date: new Date("2025-08-24"),
            end_time: new Date("2025-08-24T11:24:00"),
            number_standing: 4 
        }
    });

    const session2 = await prisma.chapelSession.upsert({
        where: {
            id: 12
        },
        update: {
            speaker_id: speaker1.id,
            topic: "The creation",
            scripture: "Genesis 1:1",
            date: new Date("2025-03-24"),
            end_time: new Date("2025-03-24T11:30:00"),
            number_standing: 2 
        },
        create:
        {
            id: 12,
            speaker_id: speaker1.id,
            topic: "The creation",
            scripture: "Genesis 1:1",
            date: new Date("2025-03-24"),
            end_time: new Date("2025-03-24T11:30:00"),
            number_standing: 2 
        }
    });

    const user1 = await prisma.user.upsert({
        where: {
            email: "student1@gmail.com",
        },
        update: {
            first_name: "Robert",
            last_name: "Smith",
            usertype: "STUDENT"
        },
        create:
        {
            email: "student1@gmail.com",
            first_name: "Robert",
            last_name: "Smith",
            usertype: "STUDENT"
        }
    });

    const user2 = await prisma.user.upsert({
        where: {
            email: "student2@gmail.com",
        },
        update: {
            first_name: "Jackson",
            last_name: "Carter",
            usertype: "FACUTLY"
        },
        create:
        {
            email: "student2@gmail.com",
            first_name: "Jackson",
            last_name: "Carter",
            usertype: "FACUTLY"
        }
    });

    const feedback1 = await prisma.feedback.upsert({
        where: {
            id: 1
        },
        update: {
            stars: 4,
            response: "Great Chapel!",
            user_id: user1.id,
            chapel_session_id: session2.id 
        },
        create:
        {
            stars: 4,
            response: "Great Chapel!",
            user_id: user1.id,
            chapel_session_id: session2.id 
        }
    });

    const feedback2 = await prisma.feedback.upsert({
        where: {
            id: 3
        },
        update: {
            stars: 2,
            response: "Could have been better.",
            user_id: user2.id,
            chapel_session_id: session1.id 
        },
        create:
        {
            stars: 2,
            response: "Could have been better.",
            user_id: user2.id,
            chapel_session_id: session1.id 
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