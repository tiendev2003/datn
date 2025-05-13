// Payments management page
"use client";

import PaymentForm from "@/components/dashboard/PaymentManagement/PaymentForm";
import PaymentList from "@/components/dashboard/PaymentManagement/PaymentList";

export default function PaymentsPage() {
  return (
    <div className="p-4">
      <PaymentForm />
      <PaymentList />
    </div>
  );
}
