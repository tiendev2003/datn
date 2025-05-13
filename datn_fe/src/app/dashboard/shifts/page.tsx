// Shifts management page
"use client";

import ShiftList from "@/components/dashboard/ShiftManagement/ShiftList";
import ShiftSchedule from "@/components/dashboard/ShiftManagement/ShiftSchedule";

export default function ShiftsPage() {
  return (
    <div className="p-4 space-y-4">
      <ShiftList />
      <ShiftSchedule />
    </div>
  );
}
