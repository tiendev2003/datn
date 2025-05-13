// Referrals management page
"use client";

import ReferralForm from "@/components/dashboard/ReferralManagement/ReferralForm";
import ReferralList from "@/components/dashboard/ReferralManagement/ReferralList";

export default function ReferralsPage() {
  return (
    <div className="p-4">
      <ReferralForm />
      <ReferralList />
    </div>
  );
}
