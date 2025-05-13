// Workout plans page
"use client";

import WorkoutPlanForm from "@/components/dashboard/WorkoutPlanManagement/WorkoutPlanForm";
import WorkoutPlanList from "@/components/dashboard/WorkoutPlanManagement/WorkoutPlanList";

export default function WorkoutPlansPage() {
  return (
    <div className="p-4">
      <WorkoutPlanForm />
      <WorkoutPlanList />
    </div>
  );
}
