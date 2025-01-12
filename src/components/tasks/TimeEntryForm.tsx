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
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  hours_worked: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Hours must be a positive number",
  }),
  notes: z.string().optional(),
});

interface TimeEntryFormProps {
  taskId: string;
  workerId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export function TimeEntryForm({ taskId, workerId, onSubmit, onCancel }: TimeEntryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hours_worked: "",
      notes: "",
    },
  });

  const createTimeEntry = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('time_entries')
        .insert([{
          task_id: taskId,
          worker_id: workerId,
          start_time: now,
          end_time: now,
          hours_worked: Number(values.hours_worked),
          notes: values.notes || null,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Time entry added successfully",
      });
      onSubmit();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add time entry",
      });
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    createTimeEntry.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="hours_worked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours Worked</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0.0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about the work done"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createTimeEntry.isPending}
          >
            {createTimeEntry.isPending ? "Adding..." : "Add Time"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
