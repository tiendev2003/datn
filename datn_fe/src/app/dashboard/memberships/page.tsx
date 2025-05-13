// Memberships management page
"use client";

import MembershipForm from "@/components/dashboard/MembershipManagement/MembershipForm";
import MembershipList from "@/components/dashboard/MembershipManagement/MembershipList";

export default function MembershipsPage() {
  return (
    <div className="p-4">
      <MembershipForm />
      <MembershipList />
    </div>
  );
}
