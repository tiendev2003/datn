// Trainer management page
"use client";

import TrainerForm from "@/components/dashboard/TrainerManagement/TrainerForm";
import TrainerList from "@/components/dashboard/TrainerManagement/TrainerList";

export default function TrainersPage() {
  return (
    <div className="p-4">
      <TrainerForm />
      <TrainerList />
    </div>
  );
}
