import { prisma } from "../lib/prisma.js";
import type { UserType } from "../generated/prisma/index.js";

/**
 * Test data factory functions
 * Use these to create test data quickly and consistently
 */

export const createUser = async (overrides: {
  name?: string;
  email?: string;
  userType?: UserType;
} = {}) => {
  return await prisma.user.create({
    data: {
      name: overrides.name ?? "Test User",
      email: overrides.email ?? `test-${Date.now()}@example.com`,
      userType: overrides.userType ?? "STUDENT",
    },
  });
};

export const createSpeaker = async (overrides: {
  name?: string;
} = {}) => {
  return await prisma.speaker.create({
    data: {
      name: overrides.name ?? "Test Speaker",
    },
  });
};

export const createChapelSession = async (overrides: {
  title?: string;
  date?: Date;
  speakerId?: number;
} = {}) => {
  let speakerId = overrides.speakerId;
  
  // Auto-create speaker if not provided
  if (!speakerId) {
    const speaker = await createSpeaker();
    speakerId = speaker.id;
  }

  return await prisma.chapelSession.create({
    data: {
      title: overrides.title ?? "Test Chapel Session",
      date: overrides.date ?? new Date(),
      speakerId,
    },
  });
};

export const createFeedback = async (overrides: {
  title?: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  chapelSessionId?: number;
} = {}) => {
  let authorId = overrides.authorId;
  let chapelSessionId = overrides.chapelSessionId;

  // Auto-create user if not provided
  if (!authorId) {
    const user = await createUser();
    authorId = user.id;
  }

  // Auto-create chapel session if not provided
  if (!chapelSessionId) {
    const session = await createChapelSession();
    chapelSessionId = session.id;
  }

  return await prisma.feedback.create({
    data: {
      title: overrides.title ?? "Test Feedback",
      content: overrides.content ?? "Test content",
      published: overrides.published ?? false,
      authorId,
      chapelSessionId,
    },
  });
};

/**
 * Create a complete test scenario with all related data
 */
export const createCompleteScenario = async () => {
  const speaker = await createSpeaker({ name: "Pastor John" });
  const user = await createUser({ name: "Student Jane", userType: "STUDENT" });
  const chapelSession = await createChapelSession({
    title: "Weekly Chapel",
    speakerId: speaker.id,
  });
  const feedback = await createFeedback({
    title: "Great session",
    content: "Very inspiring!",
    authorId: user.id,
    chapelSessionId: chapelSession.id,
    published: true,
  });

  return { speaker, user, chapelSession, feedback };
};
