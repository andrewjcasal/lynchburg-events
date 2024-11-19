"use server";

import { getOrganizations, getTags } from "../api";
import Dashboard from "../components/dashboard";
import { AuthenticatorProvider } from "../context/authenticator-context";

export default async function Page() {
  const organizations = await getOrganizations();
  const tags = await getTags();

  return (
    <AuthenticatorProvider>
      <Dashboard organizations={organizations} tags={tags} />
    </AuthenticatorProvider>
  );
}
