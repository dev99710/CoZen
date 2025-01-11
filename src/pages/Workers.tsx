import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkerCard } from "@/components/workers/WorkerCard";
import { WorkerForm } from "@/components/workers/WorkerForm";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase-client";
import { Database } from "@/lib/database.types";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Worker = Database['public']['Tables']['workers']['Row'];

export default function Workers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | undefined>();

  // Fetch workers
  const { data: workers, isLoading } = useQuery({
    queryKey: ['workers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Worker[];
    },
  });

  // Create worker mutation
  const createWorker = useMutation({
    mutationFn: async (worker: Omit<Worker, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('workers')
        .insert([{ ...worker, user_id: user!.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      toast({
        title: "Success",
        description: "Worker created successfully",
      });
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create worker",
      });
    },
  });

  // Update worker mutation
  const updateWorker = useMutation({
    mutationFn: async (worker: Worker) => {
      const { data, error } = await supabase
        .from('workers')
        .update(worker)
        .eq('id', worker.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      toast({
        title: "Success",
        description: "Worker updated successfully",
      });
      handleCloseDialog();
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update worker",
      });
    },
  });

  // Delete worker mutation
  const deleteWorker = useMutation({
    mutationFn: async (workerId: string) => {
      const { error } = await supabase
        .from('workers')
        .delete()
        .eq('id', workerId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      toast({
        title: "Success",
        description: "Worker deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete worker",
      });
    },
  });

  const handleSubmit = (worker: Worker) => {
    if (selectedWorker) {
      updateWorker.mutate(worker);
    } else {
      const { id, user_id, created_at, updated_at, ...newWorker } = worker;
      createWorker.mutate(newWorker);
    }
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedWorker(undefined);
  };

  const handleEdit = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsOpen(true);
  };

  const handleDelete = (workerId: string) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      deleteWorker.mutate(workerId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Workers</h1>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Worker
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers?.map((worker) => (
          <WorkerCard
            key={worker.id}
            worker={worker}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedWorker ? "Edit Worker" : "Add New Worker"}
            </DialogTitle>
            <DialogDescription>
              {selectedWorker
                ? "Update the worker's information below"
                : "Fill in the worker's information below"}
            </DialogDescription>
          </DialogHeader>
          <WorkerForm
            initialData={selectedWorker}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
