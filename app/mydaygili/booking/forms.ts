// ============================================================
// Booking forms — one config per CTA.
//
// Each entry drives BOTH the popup form and the WhatsApp message, so the
// two can never drift apart. `ref` is the tracking code that survives into
// the message (see waComposeUrl in ../site.ts).
//
// A future admin panel can add a form by appending one object here.
// ============================================================

import { formatIDR } from "@/lib/format";
import { OPERATORS } from "../site";

export type FieldValues = Record<string, string>;

// Built from the same OPERATORS list the comparison table uses, so the
// choices a guest sees here can never drift from the published prices.
// "Not sure" matters: plenty of guests haven't picked a boat yet.
const OPERATOR_OPTIONS = [
  ...OPERATORS.map((o) => `${o.name} — ${formatIDR(o.priceIdr)} one way`),
  "Not sure yet — please recommend one",
];

type Base = {
  name: string;
  label: string;
  required?: boolean;
  // Render this field only when the current answers satisfy the predicate.
  showIf?: (v: FieldValues) => boolean;
};

export type Field =
  | (Base & { type: "text"; placeholder?: string })
  | (Base & { type: "textarea"; placeholder?: string })
  | (Base & { type: "date"; hint?: string })
  | (Base & { type: "select"; options: string[]; placeholder?: string })
  | (Base & { type: "counter"; min: number; max: number; initial: number });

export type BookingForm = {
  ref: string;            // 🔖 Ref: code — what the team sees in WhatsApp
  title: string;
  subtitle: string;
  opening: string;        // first line of the WhatsApp message
  submitLabel: string;
  fields: Field[];
  // Turns the answers into the "• Label: value" lines of the message.
  toLines: (v: FieldValues) => string[];
};

// ── shared field builders ───────────────────────────────────
const guestName: Field = {
  name: "name",
  label: "Guest name",
  type: "text",
  required: true,
  placeholder: "Name on the booking",
};

const nationality: Field = {
  name: "nationality",
  label: "Nationality",
  type: "text",
  placeholder: "e.g. Indonesia, Australia",
};

const adults: Field = { name: "adults", label: "Adults", type: "counter", min: 1, max: 30, initial: 2 };
const kids: Field = { name: "kids", label: "Kids", type: "counter", min: 0, max: 20, initial: 0 };

const kidAges: Field = {
  name: "kidAges",
  label: "Kids' ages",
  type: "text",
  placeholder: "e.g. 4 and 7",
  showIf: (v) => Number(v.kids || 0) > 0,
};

const pickup: Field = {
  name: "pickup",
  label: "Hotel / pickup location",
  type: "text",
  placeholder: "Hotel name or area",
};

// Reads back as the client's original wording: "2 adults / 1 kids (ages: 5)".
function paxLine(v: FieldValues): string {
  const a = v.adults || "0";
  const k = Number(v.kids || 0);
  const ages = v.kidAges?.trim();
  return `• Number of pax: ${a} adults / ${k} kids${k > 0 && ages ? ` (ages: ${ages})` : ""}`;
}

// Only emit a line when the guest actually filled it in.
function line(label: string, value?: string): string | null {
  const t = value?.trim();
  return t ? `• ${label}: ${t}` : null;
}
const compact = (rows: (string | null)[]): string[] => rows.filter((r): r is string => r !== null);

// ── the forms ───────────────────────────────────────────────
export const BOOKING_FORMS = {
  FASTBOAT: {
    ref: "FASTBOAT-TICKET",
    title: "Book a Fast Boat Ticket",
    subtitle: "Fill in your trip details — we'll confirm availability on WhatsApp.",
    opening: "Hi My Day Gili! 🚤 I'd like to book a fast boat ticket.",
    submitLabel: "Send booking on WhatsApp",
    fields: [
      { name: "route", label: "Route", type: "select", required: true, placeholder: "Choose your crossing",
        options: [
          "Padang Bai ⇄ Gili Trawangan",
          "Padang Bai ⇄ Gili Air",
          "Padang Bai ⇄ Gili Meno",
          "Padang Bai ⇄ Lombok (Bangsal / Senggigi)",
          "Sanur ⇄ Nusa Penida",
          "Sanur ⇄ Nusa Lembongan",
          "Special Triangle Trip",
        ] },
      // Only the Padang Bai crossings are run by these four operators, so
      // don't offer them on a Sanur–Penida route.
      { name: "operator", label: "Preferred fast boat", type: "select",
        placeholder: "Choose one, or let us recommend",
        options: OPERATOR_OPTIONS,
        showIf: (v) => /Padang Bai/.test(v.route || "") },
      { name: "service", label: "Service", type: "select", required: true,
        options: ["One way", "Round trip"] },
      { name: "date", label: "Departure date", type: "date", required: true },
      { name: "time", label: "Preferred time", type: "select",
        options: ["Morning", "Afternoon", "Any time"] },
      { name: "returnDate", label: "Return date", type: "date",
        showIf: (v) => v.service === "Round trip" },
      guestName,
      adults,
      kids,
      kidAges,
      nationality,
    ] as Field[],
    toLines: (v) =>
      compact([
        line("Route", v.route),
        line("Preferred fast boat", v.operator),
        line("Service", v.service),
        line("Departure date", v.date),
        line("Time", v.time),
        line("Return date", v.returnDate),
        line("Guest name", v.name),
        paxLine(v),
        line("Nationality", v.nationality),
      ]),
  },

  GILI_TRIP: {
    ref: "GILI-TRIP",
    title: "Book the Gili Day Trip",
    subtitle: "One day, three islands — tell us when and where to pick you up.",
    opening: "Hi My Day Gili! 🏝️ I'd like to book the Gili Day Trip.",
    submitLabel: "Send booking on WhatsApp",
    fields: [
      { name: "date", label: "Trip date", type: "date", required: true },
      pickup,
      guestName,
      adults,
      kids,
      kidAges,
      nationality,
    ] as Field[],
    toLines: (v) =>
      compact([
        line("Trip date", v.date),
        line("Hotel / pickup location", v.pickup),
        line("Guest name", v.name),
        paxLine(v),
        line("Nationality", v.nationality),
      ]),
  },

  PENIDA: {
    ref: "PENIDA-TRIP",
    title: "Plan Your Nusa Penida Trip",
    subtitle: "Tell us your date and we'll send the full itinerary and price.",
    opening: "Hi My Day Gili! 🌊 I'd like to plan a Nusa Penida trip.",
    submitLabel: "Send request on WhatsApp",
    fields: [
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "area", label: "Which side of the island?", type: "select",
        options: ["West coast highlights (Kelingking, Broken Beach)", "East coast (Atuh, Diamond Beach)", "Snorkeling focus", "Not sure — please advise"] },
      pickup,
      guestName,
      adults,
      kids,
      kidAges,
      nationality,
    ] as Field[],
    toLines: (v) =>
      compact([
        line("Preferred date", v.date),
        line("Interested in", v.area),
        line("Hotel / pickup location", v.pickup),
        line("Guest name", v.name),
        paxLine(v),
        line("Nationality", v.nationality),
      ]),
  },

  BALI_TOUR: {
    ref: "BALI-TOUR",
    title: "Plan a Private Bali Day Tour",
    subtitle: "Tell us what interests you — we'll build the itinerary around it.",
    opening: "Hi My Day Gili! 🚗 I'd like to plan a private Bali day tour.",
    submitLabel: "Send request on WhatsApp",
    fields: [
      { name: "theme", label: "Theme", type: "select", required: true, placeholder: "What interests you?",
        options: ["Adventure (waterfalls, trekking, rafting)", "Culture (temples, rice terraces, villages)", "Textile & craft villages", "Unique / hidden spots", "Mix of a few"] },
      { name: "date", label: "Tour date", type: "date", required: true },
      { name: "ideas", label: "Places you'd like to see", type: "textarea",
        placeholder: "Optional — any specific spots on your list?" },
      pickup,
      guestName,
      adults,
      kids,
      kidAges,
    ] as Field[],
    toLines: (v) =>
      compact([
        line("Theme", v.theme),
        line("Tour date", v.date),
        line("Places I'd like to see", v.ideas),
        line("Pickup location", v.pickup),
        line("Guest name", v.name),
        paxLine(v),
      ]),
  },

  TRANSFER: {
    ref: "TRANSFER",
    title: "Request a Private Transfer",
    subtitle: "Private car with driver, anywhere in Bali.",
    opening: "Hi My Day Gili! 🚙 I'd like a private transfer quote.",
    submitLabel: "Send request on WhatsApp",
    fields: [
      { name: "from", label: "From", type: "text", required: true, placeholder: "Pickup point (airport, hotel, area)" },
      { name: "to", label: "To", type: "text", required: true, placeholder: "Destination" },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Pickup time", type: "select",
        options: ["Early morning (before 08:00)", "Morning", "Afternoon", "Evening", "Not sure yet"] },
      guestName,
      adults,
      kids,
      { name: "luggage", label: "Luggage", type: "select",
        options: ["Light (cabin bags)", "Normal (1 suitcase each)", "Heavy / surfboards"] },
    ] as Field[],
    toLines: (v) =>
      compact([
        line("From", v.from),
        line("To", v.to),
        line("Date", v.date),
        line("Pickup time", v.time),
        line("Guest name", v.name),
        paxLine(v),
        line("Luggage", v.luggage),
      ]),
  },

  COMBINE: {
    ref: "COMBINE",
    title: "Combine Routes",
    subtitle: "Gili + Nusa Penida + Lombok in one journey — tell us your plan.",
    opening: "Hi My Day Gili! 🧭 Can you combine routes for me?",
    submitLabel: "Send plan on WhatsApp",
    fields: [
      { name: "plan", label: "Your plan", type: "textarea", required: true,
        placeholder: "e.g. Sanur → Nusa Penida → Gili Trawangan → Padang Bai" },
      { name: "date", label: "Start date", type: "date", required: true },
      { name: "nights", label: "Roughly how long?", type: "select",
        options: ["Day trip only", "2–3 days", "4–6 days", "A week or more", "Not sure yet"] },
      guestName,
      adults,
      kids,
    ] as Field[],
    toLines: (v) =>
      compact([
        line("My plan", v.plan),
        line("Start date", v.date),
        line("Trip length", v.nights),
        line("Guest name", v.name),
        paxLine(v),
      ]),
  },
} satisfies Record<string, BookingForm>;

export type BookingFormKey = keyof typeof BOOKING_FORMS;
