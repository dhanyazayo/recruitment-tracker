import { PrismaClient, RecruiterRole, RecruiterStatus, Stage } from '@prisma/client';

const prisma = new PrismaClient();

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(12, 0, 0, 0);
  return date;
}

async function main() {
  await prisma.feedback.deleteMany();
  await prisma.stageHistory.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.recruiter.deleteMany();
  await prisma.job.deleteMany();

  const recruiters = await Promise.all([
    prisma.recruiter.create({
      data: {
        name: 'Michael K.',
        email: 'michael.k@example.com',
        role: RecruiterRole.SENIOR_RECRUITER,
        team: 'Engineering',
        status: RecruiterStatus.ACTIVE,
      },
    }),
    prisma.recruiter.create({
      data: {
        name: 'Sarah M.',
        email: 'sarah.m@example.com',
        role: RecruiterRole.RECRUITER,
        team: 'Product',
        status: RecruiterStatus.ACTIVE,
      },
    }),
    prisma.recruiter.create({
      data: {
        name: 'Emma L.',
        email: 'emma.l@example.com',
        role: RecruiterRole.RECRUITER,
        team: 'Design',
        status: RecruiterStatus.ACTIVE,
      },
    }),
    prisma.recruiter.create({
      data: {
        name: 'James R.',
        email: 'james.r@example.com',
        role: RecruiterRole.RECRUITING_LEAD,
        team: 'Data',
        status: RecruiterStatus.ACTIVE,
      },
    }),
    prisma.recruiter.create({
      data: {
        name: 'Priya N.',
        email: 'priya.n@example.com',
        role: RecruiterRole.HR,
        team: 'HR',
        status: RecruiterStatus.INACTIVE,
      },
    }),
  ]);

  const recruiterByName = Object.fromEntries(recruiters.map((r) => [r.name, r.id]));

  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Senior Engineer',
        department: 'Engineering',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Manager',
        department: 'Product',
      },
    }),
    prisma.job.create({
      data: {
        title: 'UX Designer',
        department: 'Design',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Data Scientist',
        department: 'Data',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Frontend Developer',
        department: 'Engineering',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Backend Engineer',
        department: 'Engineering',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Product Designer',
        department: 'Design',
      },
    }),
    prisma.job.create({
      data: {
        title: 'DevOps Engineer',
        department: 'Infrastructure',
      },
    }),
    prisma.job.create({
      data: {
        title: 'QA Engineer',
        department: 'Quality',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Full Stack Developer',
        department: 'Engineering',
      },
    }),
    prisma.job.create({
      data: {
        title: 'UI Designer',
        department: 'Design',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Security Engineer',
        department: 'Security',
      },
    }),
  ]);

  type SeedCandidate = {
    name: string;
    role: string;
    recruiter: string;
    jobIndex: number;
    stage: Stage;
    daysInStage: number;
    feedbackStages: Stage[];
    pendingCurrentFeedback?: boolean;
  };

  const seedCandidates: SeedCandidate[] = [
    {
      name: 'Sarah Chen',
      role: 'Senior Engineer',
      recruiter: 'Michael K.',
      jobIndex: 0,
      stage: Stage.FIRST_ROUND,
      daysInStage: 6,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION],
      pendingCurrentFeedback: true,
    },
    {
      name: 'Michael Torres',
      role: 'Product Manager',
      recruiter: 'Sarah M.',
      jobIndex: 1,
      stage: Stage.SECOND_ROUND,
      daysInStage: 2,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION, Stage.FIRST_ROUND],
    },
    {
      name: 'Emma Wilson',
      role: 'UX Designer',
      recruiter: 'Emma L.',
      jobIndex: 2,
      stage: Stage.INITIAL_DISCUSSION,
      daysInStage: 12,
      feedbackStages: [Stage.FOUND],
    },
    {
      name: 'James Park',
      role: 'Data Scientist',
      recruiter: 'James R.',
      jobIndex: 3,
      stage: Stage.HR_ROUND,
      daysInStage: 1,
      feedbackStages: [
        Stage.FOUND,
        Stage.INITIAL_DISCUSSION,
        Stage.FIRST_ROUND,
        Stage.SECOND_ROUND,
      ],
    },
    {
      name: 'Lisa Anderson',
      role: 'Frontend Developer',
      recruiter: 'Michael K.',
      jobIndex: 4,
      stage: Stage.FIRST_ROUND,
      daysInStage: 8,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION],
    },
    {
      name: 'David Kim',
      role: 'Backend Engineer',
      recruiter: 'Sarah M.',
      jobIndex: 5,
      stage: Stage.FOUND,
      daysInStage: 0,
      feedbackStages: [],
      pendingCurrentFeedback: true,
    },
    {
      name: 'Rachel Green',
      role: 'Product Designer',
      recruiter: 'Emma L.',
      jobIndex: 6,
      stage: Stage.SECOND_ROUND,
      daysInStage: 4,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION, Stage.FIRST_ROUND],
    },
    {
      name: 'Tom Bradley',
      role: 'DevOps Engineer',
      recruiter: 'James R.',
      jobIndex: 7,
      stage: Stage.INITIAL_DISCUSSION,
      daysInStage: 3,
      feedbackStages: [Stage.FOUND],
      pendingCurrentFeedback: true,
    },
    {
      name: 'Sophie Turner',
      role: 'QA Engineer',
      recruiter: 'Michael K.',
      jobIndex: 8,
      stage: Stage.HR_ROUND,
      daysInStage: 4,
      feedbackStages: [
        Stage.FOUND,
        Stage.INITIAL_DISCUSSION,
        Stage.FIRST_ROUND,
        Stage.SECOND_ROUND,
      ],
    },
    {
      name: 'Alex Martinez',
      role: 'Full Stack Developer',
      recruiter: 'Sarah M.',
      jobIndex: 9,
      stage: Stage.FIRST_ROUND,
      daysInStage: 3,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION, Stage.FIRST_ROUND],
    },
    {
      name: 'Nina Patel',
      role: 'UI Designer',
      recruiter: 'Emma L.',
      jobIndex: 10,
      stage: Stage.FOUND,
      daysInStage: 1,
      feedbackStages: [],
    },
    {
      name: 'Chris Evans',
      role: 'Security Engineer',
      recruiter: 'James R.',
      jobIndex: 11,
      stage: Stage.SECOND_ROUND,
      daysInStage: 2,
      feedbackStages: [Stage.FOUND, Stage.INITIAL_DISCUSSION, Stage.FIRST_ROUND],
    },
  ];

  for (const item of seedCandidates) {
    const stageEnteredAt = daysAgo(item.daysInStage);
    const recruiterId = recruiterByName[item.recruiter];

    const candidate = await prisma.candidate.create({
      data: {
        name: item.name,
        email: `${item.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        role: item.role,
        recruiterId,
        jobId: jobs[item.jobIndex].id,
        currentStage: item.stage,
        stageEnteredAt,
        stageHistory: {
          create: {
            fromStage: null,
            toStage: item.stage,
            movedAt: stageEnteredAt,
            notes: 'Seeded candidate',
          },
        },
      },
    });

    for (const stage of item.feedbackStages) {
      if (item.pendingCurrentFeedback && stage === item.stage) {
        continue;
      }

      await prisma.feedback.create({
        data: {
          candidateId: candidate.id,
          stage,
          interviewerName: item.recruiter,
          rating: 4,
          content: `Feedback for ${stage.replace(/_/g, ' ').toLowerCase()} - candidate progressing well.`,
          submittedAt: daysAgo(item.daysInStage + 1),
        },
      });
    }
  }

  console.log(
    `Seeded ${recruiters.length} recruiters, ${jobs.length} jobs, and ${seedCandidates.length} candidates`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
