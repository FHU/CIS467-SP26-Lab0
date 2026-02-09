import { create } from "node:domain";
import { prisma } from "../src/lib/prisma";
import { time, timeStamp } from "node:console";

async function main() {
    // Create users
    const user1 = await prisma.uSER.create({
        data: {
            id: 1,
            first_name: "Kevin",
            last_name: "Steven",
            email: "STEVENKEVIN@gmail.com",
            type: "STUDENT",
        }
    });

    const user2 = await prisma.uSER.create({
        data: {
            id: 2,
            first_name: "Mike",
            last_name: "Luke",
            email: "MikeLuke@gmail.com",
            type: "STAFF",
        }
    });

    const user3 = await prisma.uSER.create({
        data: {
            id: 3,
            first_name: "John",
            last_name: "Paul",
            email: "JohnPaul@gmail.com",
            type: "ALUMNI",
        }
    });

    const speaker1 = await prisma.sPEAKER.create({
        data: {
            id:1,
            first_name: "David",
            last_name: "Shannon",
            bio: "The goat of FHU",
            title: "Mr",
            type: "FACULTY"
        }
    });

    const speaker2 = await prisma.sPEAKER.create({
        data: {
            id:2,
            first_name: "Anderson",
            last_name: "Judd",
            bio: "The goat of XBX",
            type: "STUDENT"
        }
    });
    const speaker3 = await prisma.sPEAKER.create({
        data: {
            id: 3,
            first_name: "Swing",
            last_name: "Man",
            bio: "The greatest chapel of all time",
            type: "ALUMNI"
        }
    });

    const chapel1 = await prisma.cHAPEL_SESSION.create({
        data: {
            id: 1,
            speaker_id: speaker1.id,
            topic: "Genesis 1:1",
            date: new Date(),
            time: new Date(),
            number_standings: 2203,
        }
    })

    const chapel2 = await prisma.cHAPEL_SESSION.create({
        data: {
            id: 2,
            speaker_id: speaker2.id,
            topic: "Galatians 6:2",
            date: new Date(),
            time: new Date(),
            number_standings: 3030,
        }
    })

    const chapel3 = await prisma.cHAPEL_SESSION.create({
        data: {
            id: 3,
            speaker_id: speaker3.id,
            topic: "Acts 2:38",
            date: new Date(),
            time: new Date(),
            number_standings: 5000,
        }
    })

    const feedback1 = await prisma.fEEDBACK.create({
        data: {
            user_id: user1.id,
            chapel_session_id: chapel1.id,
            stars: 5,
            response: "Great Chapel talk I would show my buddy from high school"
        }
    })

    const feedback2 = await prisma.fEEDBACK.create({
        data: {
            user_id: user1.id,
            chapel_session_id: chapel2.id,
            stars: 3,
            response: "Speaker made a non-biblical point about giving him money to care for his burdens"
        }
    })

    const feedback3 = await prisma.fEEDBACK.create({
        data: {
            user_id: user1.id,
            chapel_session_id: chapel3.id,
            stars: 5,
            response: "I know that I should be baptized now!"
        }
    })

    const feedback4 = await prisma.fEEDBACK.create({
        data: {
            user_id: user2.id,
            chapel_session_id: chapel1.id,
            stars: 1,
            response: "Speaker made some questionable points about Creation"
        }
    })

    const feedback5 = await prisma.fEEDBACK.create({
        data: {
            user_id: user2.id,
            chapel_session_id: chapel2.id,
            stars: 1,
            response: "Speaker just wants my money I think"
        }
    })

    const feedback6 = await prisma.fEEDBACK.create({
        data: {
            user_id: user2.id,
            chapel_session_id: chapel3.id,
            stars: 4,
            response: "I Love a good day of pentacost, but I've heard similar ones"
        }
    })

    const feedback7 = await prisma.fEEDBACK.create({
        data: {
            user_id: user3.id,
            chapel_session_id: chapel1.id,
            stars: 4,
            response: "Speaker was kind of cute"
        }
    })

    const feedback8 = await prisma.fEEDBACK.create({
        data: {
            user_id: user2.id,
            chapel_session_id: chapel2.id,
            stars: 1,
            response: "Speaker was definently broke and wanted money"
        }
    })

    const feedback9 = await prisma.fEEDBACK.create({
        data: {
            user_id: user2.id,
            chapel_session_id: chapel3.id,
            stars: 5,
            response: "Peter had so much aura"
        }
    })

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