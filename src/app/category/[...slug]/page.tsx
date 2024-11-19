import { List } from "@mui/joy";
import { Amplify } from "aws-amplify";

import { getOrganizationsByTag } from "../../api";
import { OrganizationRow } from "../../components/organization-row";
import outputs from "../../../../amplify_outputs.json";
import { Container } from "../../components/container";

Amplify.configure(outputs);

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}
export default async function Page({ params }: PageProps) {
  const slug = (await params).slug[0];
  const organizations = await getOrganizationsByTag({ content: slug });
  return (
    <Container>
      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        <>
          {organizations
            .filter((o) => o)
            .map((organization) => (
              <OrganizationRow
                key={organization.id}
                organization={organization}
              />
            ))}
        </>
      </List>
    </Container>
  );
}
