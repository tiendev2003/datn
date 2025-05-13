// Classes management page
"use client";

import ClassForm from "@/components/dashboard/ClassManagement/ClassForm";
import ClassList from "@/components/dashboard/ClassManagement/ClassList";

export default function ClassesPage() {
  return (
    <div className="p-4">
      <ClassForm />
      <ClassList />
    </div>
  );
}
