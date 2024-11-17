"use server";

import { getOrganizations, getTags } from "../api";
import Dashboard from "../components/dashboard";

export default async function Page() {
  const organizations = await getOrganizations();
  const tags = await getTags();

  return <Dashboard organizations={organizations} tags={tags} />;
}
