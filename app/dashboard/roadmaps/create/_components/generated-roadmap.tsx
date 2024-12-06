// Shared component to display the generated path
interface Path {
  topic: string;
  lessons: string[];
}

export default function GeneratedRoadmap({ path }: { path: Path }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">{path.topic}</h2>
      <ul>
        {path.lessons.map((lesson, index) => (
          <li key={index} className="mb-2">
            {index + 1}. {lesson}
          </li>
        ))}
      </ul>
    </div>
  );
}
