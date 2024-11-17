import { List } from "@mui/joy";
import { getOrganizations } from "./api";
import { Navbar } from "./components/navbar";
import { OrganizationRow } from "./components/organization-row";

export default async function Page() {
  const organizations = await getOrganizations();

  return (
    <>
      <Navbar />
      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        <>
          {organizations.map((organization) => (
            <OrganizationRow
              key={organization.id}
              organization={organization}
            />
          ))}
        </>
      </List>
    </>
  );
}
