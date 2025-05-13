// User management page
"use client";

import UserForm from "@/components/dashboard/UserManagement/UserForm";
import UserList from "@/components/dashboard/UserManagement/UserList";

export default function UsersPage() {
  return (
    <div className="p-4">
      <UserForm />
      <UserList />
    </div>
  );
}
