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
        <p className="max-w-2xs mx-auto text-brand-gold-light uppercase tracking-widest mb-4">
          OUR EXPERTISE
        </p>
        <h2 className="text-6xl md:text-8xl font-serif mb-6">Services</h2>
        <div className="w-2xl h-px bg-gray-300 my-16 justify-center mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto text-left">
          <Image
            src="/images/services.webp"
            alt="Services Introduction"
            width={400}
            height={200}
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="flex flex-col space-y-4 m-auto justify-center gap-10">
            <p className="font-serif text-4xl font-normal leading-11 text-[003527]">
              Providing a{" "}
              <span className="font-bold">full range of services</span> means
              that we see the project{" "}
              <span className="font-bold">all the way through</span>.
            </p>
            <p className="text-lg font-serif text-[#003527]">
              From the initial concept to scheduled maintenance as it matures,
              our comprehensive approach enables you, the customer, to relax and
              enjoy the process while we handle every aspect of the project.
            </p>
          </div>
        </div>

        <div className="pt-36 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
          {TASK_PILLARS.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </section>
  );
}
