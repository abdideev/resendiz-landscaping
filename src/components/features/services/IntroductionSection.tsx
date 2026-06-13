import Image from "next/image";
import { TaskCard } from "@/components/ui/TaskCard";
import { TASK_PILLARS } from "@/constants/tasks";

export function IntroductionSection() {
  return (
    <section
      id="services"
      className="relative w-full py-16 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-brand-gold font-sans font-medium uppercase tracking-[0.2em] text-sm md:text-base">
          OUR EXPERTISE
        </p>
        <h2 className="text-brand-green text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6">
          Services
        </h2>
        <div className="max-w-2xl w-full h-px bg-gray-300 my-10 md:my-16 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto text-left">
          <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden shadow-lg">
            <Image
              src="/images/services.webp"
              alt="Landscaping services preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 md:gap-10">
            <p className="font-serif text-2xl md:text-4xl font-normal leading-tight text-[#003527] text-bg-black">
              Providing a{" "}
              <span className="font-bold text-brand-green">
                full range of services
              </span>{" "}
              means that we see the project{" "}
              <span className="font-bold text-brand-green">
                all the way through
              </span>
            </p>
            <p className="text-base md:text-lg font-serif text-neutral-700">
              From the initial concept to scheduled maintenance as it matures,
              our comprehensive approach enables you, the customer, to relax and
              enjoy the process while we handle every aspect of the project.
            </p>
          </div>
        </div>

        <div className="pt-20 md:pt-36 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
          {TASK_PILLARS.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}
