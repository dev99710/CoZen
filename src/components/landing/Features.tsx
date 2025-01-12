import { Users, ListTodo, Clock, DollarSign, Shield, BarChart } from "lucide-react";

const features = [
  {
    name: "Worker Management",
    description: "Add and manage workers with their skills, rates, and availability.",
    icon: Users,
  },
  {
    name: "Task Tracking",
    description: "Create, assign, and monitor tasks with priorities and deadlines.",
    icon: ListTodo,
  },
  {
    name: "Time Management",
    description: "Track hours worked and monitor task progress in real-time.",
    icon: Clock,
  },
  {
    name: "Cost Control",
    description: "Monitor labor costs and expenses for better budget management.",
    icon: DollarSign,
  },
  {
    name: "Secure Access",
    description: "Role-based access control and data encryption for your security.",
    icon: Shield,
  },
  {
    name: "Analytics",
    description: "Get insights into team performance and project costs.",
    icon: BarChart,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Everything You Need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Your Business
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our comprehensive suite of tools helps you manage your team effectively
            and keep your projects on track.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
