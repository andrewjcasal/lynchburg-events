"use server";

import { cookies } from "next/headers";

import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { Schema } from "../../amplify/data/resource";
import outputs from "../../amplify_outputs.json";

const publicClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "apiKey",
});

export const getOrganizations = async () => {
  const { data: organizations } = await publicClient.models.Organization.list({
    selectionSet: ["content", "id", "events.*", "tags.*"],
  });
  return organizations;
};

interface getOrganizationsByTagProp {
  content: string;
}

export const getOrganizationsByTag = async ({
  content,
}: getOrganizationsByTagProp) => {
  const tag = await publicClient.models.Tag.list({
    selectionSet: ["id", "content"],
    filter: {
      content: {
        eq: content,
      },
    },
  });

  const tagId = tag.data[0]?.id;
  if (tagId === undefined) {
    return [];
  }

  const { data: organizations } =
    await publicClient.models.OrganizationTag.list({
      selectionSet: [
        "organization.content",
        "organization.id",
        "organization.events.*",
        "tag.id",
      ],
      filter: {
        tagId: {
          eq: tagId,
        },
      },
    });
  const organizations1 = organizations.map(
    (organization) => organization.organization
  );
  return organizations1;
};

export const getTags = async () => {
  const { data: tags } = await publicClient.models.Tag.list({
    selectionSet: ["content", "id"],
  });
  return tags;
};
