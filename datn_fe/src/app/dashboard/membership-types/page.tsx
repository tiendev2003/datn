// Membership types page
"use client";

import MembershipTypeForm from "@/components/dashboard/MembershipManagement/MembershipTypeForm";
import MembershipTypeList from "@/components/dashboard/MembershipManagement/MembershipTypeList";

export default function MembershipTypesPage() {
  return (
    <div className="p-4">
      <MembershipTypeForm />
      <MembershipTypeList />
    </div>
  );
}
