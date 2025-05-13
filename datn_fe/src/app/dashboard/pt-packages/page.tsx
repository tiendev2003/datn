// PT packages page
"use client";

import PTPackageForm from "@/components/dashboard/PTPackageManagement/PTPackageForm";
import PTPackageList from "@/components/dashboard/PTPackageManagement/PTPackageList";

export default function PTPackagesPage() {
  return (
    <div className="p-4">
      <PTPackageForm />
      <PTPackageList />
    </div>
  );
}
