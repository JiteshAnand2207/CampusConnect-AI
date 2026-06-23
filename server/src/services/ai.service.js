import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";

import Event from "../models/event.model.js";
import Problem from "../models/problem.model.js";
import Solution from "../models/solution.model.js";
import { getOpenAIClient } from "../config/openai.js";

const buildCampusDocuments = async (user) => {
  const documents = [];

  const events = await Event.find({ status: "approved" })
    .populate("createdBy", "name role department")
    .sort({ startDate: 1 })
    .limit(50);

  events.forEach((event) => {
    documents.push(
      new Document({
        pageContent: `
Type: Event
Title: ${event.title}
Description: ${event.description}
Category: ${event.category}
Department: ${event.department}
Venue: ${event.venue}
Start Date: ${event.startDate}
End Date: ${event.endDate}
Capacity: ${event.capacity}
Registered Count: ${event.registeredCount}
Created By: ${event.createdBy?.name || "Unknown"}
`,
        metadata: {
          type: "event",
          id: event._id.toString(),
          title: event.title,
          link: `/events/${event._id}`,
        },
      })
    );
  });

  const problemQuery = {
    $or: [{ visibility: "public" }],
  };

  if (user?._id) {
    problemQuery.$or.push({ postedBy: user._id });
  }

  const problems = await Problem.find(problemQuery)
    .populate("postedBy", "name role department year")
    .populate("acceptedSolution")
    .sort({ createdAt: -1 })
    .limit(80);

  const problemIds = problems.map((problem) => problem._id);

  const solutions = await Solution.find({
    problem: { $in: problemIds },
  })
    .populate("postedBy", "name role department year")
    .sort({ isAccepted: -1, createdAt: -1 })
    .limit(120);

  const solutionsByProblem = solutions.reduce((acc, solution) => {
    const problemId = solution.problem.toString();

    if (!acc[problemId]) {
      acc[problemId] = [];
    }

    acc[problemId].push(solution);
    return acc;
  }, {});

  problems.forEach((problem) => {
    const relatedSolutions = solutionsByProblem[problem._id.toString()] || [];

    const solutionText = relatedSolutions
      .map(
        (solution, index) =>
          `Solution ${index + 1}: ${solution.description} Posted by: ${
            solution.postedBy?.name || "Unknown"
          } Accepted: ${solution.isAccepted ? "Yes" : "No"}`
      )
      .join("\n");

    documents.push(
      new Document({
        pageContent: `
Type: Problem
Title: ${problem.title}
Description: ${problem.description}
Category: ${problem.category}
Visibility: ${problem.visibility}
Status: ${problem.status}
Posted By: ${problem.postedBy?.name || "Unknown"}
Upvotes: ${problem.upvotes?.length || 0}
Solutions:
${solutionText || "No solutions yet"}
`,
        metadata: {
          type: "problem",
          id: problem._id.toString(),
          title: problem.title,
          link: `/problems/${problem._id}`,
        },
      })
    );
  });

  return documents;
};

const retrieveCampusContext = async (question, user) => {
  const documents = await buildCampusDocuments(user);

  if (documents.length === 0) {
    return {
      context: "No campus data is available yet.",
      sources: [],
    };
  }

  const embeddings = new OpenAIEmbeddings({
    model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
  );

  const relevantDocs = await vectorStore.similaritySearch(question, 5);

  const context = relevantDocs
    .map((doc, index) => {
      return `
Source ${index + 1}
Type: ${doc.metadata.type}
Title: ${doc.metadata.title}
Link: ${doc.metadata.link}
Content:
${doc.pageContent}
`;
    })
    .join("\n\n");

  const sources = relevantDocs.map((doc) => ({
    type: doc.metadata.type,
    title: doc.metadata.title,
    link: doc.metadata.link,
  }));

  return {
    context,
    sources,
  };
};

export const askCampusAI = async ({ question, user }) => {
  const { context, sources } = await retrieveCampusContext(question, user);

  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL,
    input: [
      {
        role: "system",
        content: `
You are CampusConnect AI, an assistant for a college event and campus problem management platform.

Rules:
1. Answer only using the provided campus context when the question is about platform data.
2. If the context does not contain the answer, clearly say that the platform does not have enough data yet.
3. Keep answers helpful, practical, and student-friendly.
4. Mention useful links when available.
5. Do not reveal private problem data unless it belongs to the current user or is included in the provided context.
6. Do not invent event dates, venues, registrations, or problem statuses.
`,
      },
      {
        role: "user",
        content: `
Current user:
Name: ${user?.name}
Role: ${user?.role}
Department: ${user?.department || "Not provided"}
Year: ${user?.year || "Not provided"}

Campus context:
${context}

Question:
${question}
`,
      },
    ],
  });

  const answer =
    response.output_text ||
    "I could not generate an answer right now. Please try again.";

  return {
    answer,
    sources,
  };
};