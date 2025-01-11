import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, WorkerStatus } from "@/lib/database.types";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

type Worker = Database['public']['Tables']['workers']['Row'];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
  hourly_rate: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Hourly rate must be a positive number",
  }),
  status: z.enum(["active", "inactive", "on_leave"] as const),
  skill: z.string().optional(),
});

interface WorkerFormProps {
  initialData?: Worker;
  onSubmit: (data: Worker) => void;
  onCancel: () => void;
}

export function WorkerForm({ initialData, onSubmit, onCancel }: WorkerFormProps) {
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      hourly_rate: initialData?.hourly_rate.toString() || "",
      status: (initialData?.status as WorkerStatus) || "active",
      skill: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const workerData = {
      ...initialData,
      name: values.name,
      phone: values.phone || null,
      hourly_rate: Number(values.hourly_rate),
      status: values.status,
      skills,
    } as Worker;

    onSubmit(workerData);
  };

  const addSkill = () => {
    const skill = form.getValues("skill");
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      form.setValue("skill", "");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Worker name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hourly_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input placeholder="Add a skill" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={addSkill}
                  >
                    Add
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update" : "Create"} Worker
          </Button>
        </div>
      </form>
    </Form>
  );
}
