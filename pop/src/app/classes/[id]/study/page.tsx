import { loadNotes } from "@/lib/notes";
import { getOverview } from "../overviewData";
import LegacyStudy from "./LegacyStudy";
import NotesStudy, { type StudyUnit } from "./NotesStudy";

export default async function StudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ topic?: string; tab?: string }>;
}) {
  const { id: classId } = await params;
  const { topic, tab } = await searchParams;

  const notes = loadNotes(classId);
  const overview = getOverview(classId);
  // Classes without imported notes keep the original lesson viewer
  if (!notes || !overview) return <LegacyStudy />;

  const units: StudyUnit[] = (overview.tiers ?? [{ name: "", units: overview.units }]).flatMap((tier) =>
    tier.units.map((u) => ({
      label: overview.tiers ? `${tier.name} · ${u.title}` : u.title,
      topics: u.topics.map((t) => ({ id: t.id, title: t.title, tag: t.tag })),
    }))
  );
  const first = units.flatMap((u) => u.topics)[0]?.id;
  const topicId = topic && notes[topic] ? topic : first;
  if (!topicId) return <LegacyStudy />;

  return (
    <NotesStudy
      classId={classId}
      name={overview.name}
      code={overview.code}
      board={overview.board}
      level={overview.level}
      units={units}
      topicId={topicId}
      notes={notes[topicId]}
      tab={tab ?? "notes"}
    />
  );
}
