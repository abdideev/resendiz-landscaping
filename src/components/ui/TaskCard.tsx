import type { TaskPillar } from "@/types/tasks";
interface TaskCardProps {
  task: TaskPillar;
}

export function TaskCard({ task }: TaskCardProps) {
  const { icon: Icon, title, description } = task;

  return (
    <div className="flex flex-col items-center text-center max-w-xs">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-green flex items-center justify-center mb-6">
        <Icon
          className="w-12 h-12 md:w-14 md:h-14 text-white"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-brand-dark mb-3">
        {title}
      </h3>

      <p className="text-sm md:text-base text-brand-dark/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
