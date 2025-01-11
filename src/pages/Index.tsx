import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, ListTodo, Clock, DollarSign } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Welcome, {profile?.full_name || profile?.username}!</h1>
          <p className="text-muted-foreground mt-2">
            Manage your workers and tasks efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workers Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Workers Management
              </CardTitle>
              <CardDescription>
                Add and manage workers, set rates, and track skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/workers")}
                className="w-full flex items-center justify-between"
              >
                Go to Workers
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Task Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="h-6 w-6" />
                Task Management
              </CardTitle>
              <CardDescription>
                Create and assign tasks, set priorities, and track progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/tasks")}
                className="w-full flex items-center justify-between"
              >
                Go to Tasks
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Time Tracking Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Time Tracking
              </CardTitle>
              <CardDescription>
                Log hours worked and monitor task progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/tasks")}
                className="w-full flex items-center justify-between"
              >
                Track Time
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Cost Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Cost Management
              </CardTitle>
              <CardDescription>
                Track expenses and monitor project costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/tasks")}
                className="w-full flex items-center justify-between"
              >
                View Costs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}