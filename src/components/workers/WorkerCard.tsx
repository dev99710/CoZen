import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { Phone, Mail, Pencil, Trash2 } from "lucide-react";

type Worker = Database['public']['Tables']['workers']['Row'];

interface WorkerCardProps {
  worker: Worker;
  onEdit: (worker: Worker) => void;
  onDelete: (workerId: string) => void;
}

const statusColors = {
  active: "bg-green-500",
  inactive: "bg-gray-500",
  on_leave: "bg-yellow-500",
};

export function WorkerCard({ worker, onEdit, onDelete }: WorkerCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{worker.name}</CardTitle>
        <Badge className={statusColors[worker.status]}>
          {worker.status.replace('_', ' ')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{worker.phone || 'No phone number'}</span>
        </div>
        <div>
          <div className="mb-2 font-semibold">Skills</div>
          <div className="flex flex-wrap gap-2">
            {worker.skills?.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold">Hourly Rate</div>
          <div className="text-2xl font-bold text-primary">
            ${worker.hourly_rate.toFixed(2)}/hr
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(worker)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-destructive"
          onClick={() => onDelete(worker.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
