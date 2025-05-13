// Exercise management page
"use client";

import ExerciseForm from "@/components/dashboard/ExerciseManagement/ExerciseForm";
import ExerciseList from "@/components/dashboard/ExerciseManagement/ExerciseList";

export default function ExercisesPage() {
  return (
    <div className="p-4">
      <ExerciseForm />
      <ExerciseList />
    </div>
  );
}
