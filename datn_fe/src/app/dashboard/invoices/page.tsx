// Invoices management page
"use client";

import InvoiceForm from "@/components/dashboard/InvoiceManagement/InvoiceForm";
import InvoiceList from "@/components/dashboard/InvoiceManagement/InvoiceList";

export default function InvoicesPage() {
  return (
    <div className="p-4">
      <InvoiceForm />
      <InvoiceList />
    </div>
  );
}
