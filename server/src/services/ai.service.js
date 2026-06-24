import Event from "../models/event.model.js";
import Problem from "../models/problem.model.js";
import { getGeminiClient } from "../config/gemini.js";

const withTimeout = (promise, ms = 18000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini request timed out")), ms)
    ),
  ]);
};

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getCampusContext = async () => {
  const [events, problems] = await Promise.all([
    Event.find({})
      .select(
        "title category venue startDate endDate status capacity registeredCount department"
      )
      .sort({ startDate: 1 })
      .limit(8)
      .lean(),

    Problem.find({})
      .select("title category location status priority description createdAt")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
  ]);

  return { events, problems };
};

const eventsText = (events) => {
  if (!events.length) {
    return "No events are available in the current database.";
  }

  return events
    .map((event, index) => {
      return `${index + 1}. ${event.title} (${event.category || "event"})
Venue: ${event.venue || "N/A"}
Date: ${formatDate(event.startDate)}
Status: ${event.status || "N/A"}
Seats: ${event.registeredCount || 0}/${event.capacity || 0}`;
    })
    .join("\n\n");
};

const problemsText = (problems) => {
  if (!problems.length) {
    return "No campus problems are available in the current database.";
  }

  return problems
    .map((problem, index) => {
      return `${index + 1}. ${problem.title}
Category: ${problem.category || "N/A"}
Location: ${problem.location || "N/A"}
Priority: ${problem.priority || "N/A"}
Status: ${problem.status || "N/A"}`;
    })
    .join("\n\n");
};

const localCampusAnswer = ({ question, user, events, problems }) => {
  const q = question.toLowerCase();

  if (q.includes("event") || q.includes("available") || q.includes("upcoming")) {
    return `Here are the current events I found in CampusConnect AI:\n\n${eventsText(
      events
    )}\n\nTo register, open Events, choose an approved event, then click Register for event.`;
  }

  if (q.includes("register")) {
    return `To register for an event:\n
1. Login as a student.
2. Open the Events page.
3. Select an approved event.
4. Click Register for event.
5. After registration, go to Dashboard > My Tickets to see your QR ticket.`;
  }

  if (q.includes("ticket") || q.includes("qr")) {
    return `Your QR ticket is available here:\n
Dashboard > My Tickets

The ticket contains a QR code and ticket code. At event entry, the organizer or admin can verify it from Dashboard > Verify Ticket.`;
  }

  if (q.includes("verify") || q.includes("attendance")) {
    return `To verify a ticket:\n
1. Login as organizer or admin.
2. Open Dashboard > Verify Ticket.
3. Enter the student's ticket code from their QR ticket.
4. Submit it.
5. The system marks the registration as attended.`;
  }

  if (q.includes("problem") || q.includes("issue") || q.includes("report")) {
    return `To report a campus problem:\n
1. Login to CampusConnect AI.
2. Go to Dashboard > Report Problem.
3. Add title, category, location, priority, and description.
4. Submit the problem.
5. Track updates from the Problems section.

Current problem reports:\n\n${problemsText(problems)}`;
  }

  if (q.includes("admin") || q.includes("approve")) {
    return `Admin flow:\n
1. Login as admin.
2. Open Dashboard > Admin Panel or /dashboard/admin/events.
3. Review pending events.
4. Approve valid events or reject incomplete ones with a reason.
5. Approved events become visible publicly on the Events page.`;
  }

  if (q.includes("organizer")) {
    return `Organizer flow:\n
1. Login as organizer.
2. Create events from Dashboard > Create Event.
3. Wait for admin approval.
4. Manage your events from Dashboard > Manage Events.
5. Verify student tickets from Dashboard > Verify Ticket.`;
  }

  return `CampusConnect AI helps students, organizers, admins, and moderators manage campus events and problems.

For your role (${user?.role || "user"}), useful sections are:
- Events: browse approved events
- My Tickets: view QR tickets after registration
- Report Problem: submit campus issues
- Create Event: organizers can submit events
- Admin Panel: admins approve events
- Verify Ticket: organizers/admins mark attendance

You can ask me about events, registration, QR tickets, problem reports, admin approval, or organizer workflow.`;
};

const buildPrompt = ({ question, user, events, problems }) => {
  return `
You are CampusConnect AI, the assistant for a college event management and campus problem reporting website.

Current user:
Name: ${user?.name || "Unknown"}
Role: ${user?.role || "guest"}
Department: ${user?.department || "Unknown"}
Year: ${user?.year || "Unknown"}

Platform routes:
- Events: /events
- Student QR tickets: /dashboard/tickets
- Create event: /dashboard/events/create
- Verify ticket: /dashboard/verify-ticket
- Report problem: /dashboard/problems/create
- Admin event approval: /dashboard/admin/events
- AI assistant: /dashboard/ai

Current events:
${eventsText(events)}

Current problems:
${problemsText(problems)}

Rules:
- Answer simply.
- Use only the current events/problems listed above.
- Do not invent ticket codes, users, or records.
- Give step-by-step instructions when user asks how to use the site.

User question:
${question}
`;
};

export const askCampusAI = async ({ question, user }) => {
  const { events, problems } = await getCampusContext();

  try {
    const ai = getGeminiClient();

    const interaction = await withTimeout(
      ai.interactions.create({
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
        input: buildPrompt({ question, user, events, problems }),
      }),
      18000
    );

    return {
      answer:
        interaction.output_text ||
        localCampusAnswer({ question, user, events, problems }),
      sources: ["Gemini API", "CampusConnect AI database context"],
    };
  } catch (error) {
    console.error("AI SERVICE FALLBACK:", error?.message || error);

    return {
      answer: localCampusAnswer({ question, user, events, problems }),
      sources: [
        "CampusConnect AI local fallback",
        "CampusConnect AI database context",
      ],
    };
  }
};