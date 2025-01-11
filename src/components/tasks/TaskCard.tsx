import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, TaskPriority, TaskStatus } from "@/lib/database.types";
import { Calendar, Clock, DollarSign, Play, Pause, Plus } from "lucide-react";
import { format } from "date-fns";
import { TimeEntryForm } from "./TimeEntryForm";
import { ExpenseForm } from "./ExpenseForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Task = Database['public']['Tables']['tasks']['Row'] & {
  worker: Database['public']['Tables']['workers']['Row'];
  total_cost: number;
  total_hours: number;
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onTimeEntry: (taskId: string, workerId: string) => void;
  onExpense: (taskId: string, workerId: string) => void;
}

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-yellow-500",
  in_progress: "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-gray-500",
};

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-gray-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export function TaskCard({ task, onEdit, onDelete, onTimeEntry, onExpense }: TaskCardProps) {
  const [isTimeEntryOpen, setIsTimeEntryOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{task.title}</CardTitle>
          <div className="flex gap-2">
            <Badge className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge className={statusColors[task.status]}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>
              {task.start_date
                ? format(new Date(task.start_date), 'MMM d, yyyy')
                : 'No start date'}
              {task.end_date && ` - ${format(new Date(task.end_date), 'MMM d, yyyy')}`}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>{task.total_hours.toFixed(1)} hrs</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Assigned to:</span>
            <span className="text-sm">{task.worker?.name || 'Unassigned'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="h-4 w-4" />
            <span>${task.total_cost.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsTimeEntryOpen(true)}
          >
            {task.status === 'in_progress' ? (
              <Pause className="h-4 w-4 mr-1" />
            ) : (
              <Play className="h-4 w-4 mr-1" />
            )}
            Time
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpenseOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Expense
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>

      <Dialog open={isTimeEntryOpen} onOpenChange={setIsTimeEntryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Time Entry</DialogTitle>
          </DialogHeader>
          <TimeEntryForm
            taskId={task.id}
            workerId={task.worker_id!}
            onSubmit={() => {
              onTimeEntry(task.id, task.worker_id!);
              setIsTimeEntryOpen(false);
            }}
            onCancel={() => setIsTimeEntryOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <ExpenseForm
            taskId={task.id}
            workerId={task.worker_id!}
            onSubmit={() => {
              onExpense(task.id, task.worker_id!);
              setIsExpenseOpen(false);
            }}
            onCancel={() => setIsExpenseOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
