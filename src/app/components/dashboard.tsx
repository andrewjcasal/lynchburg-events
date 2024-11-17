"use client";

import React, { useState } from "react";
import { Amplify } from "aws-amplify";

import { Schema } from "../../../amplify/data/resource";
import outputs from "../../../amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import { OrganizationRow } from "./organization-row";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  List,
  Stack,
  Typography,
} from "@mui/joy";
import { Navbar } from "./navbar";
import { Authenticator } from "@aws-amplify/ui-react";
import { Organization, Tag } from "../types";
import { MyTags } from "./my-tags";

interface DashboardProps {
  organizations: Organization[];
  tags: Tag[];
}

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Dashboard({
  organizations: initOrganizations,
  tags: initTags,
}: DashboardProps) {
  const [tags] = useState<Tag[]>(initTags);
  const [organizations, setOrganizations] =
    useState<Organization[]>(initOrganizations);
  const [currOrg, setCurrOrg] = useState<string>("");
  const [currTitle, setCurrTitle] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<Tag[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrOrg(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrTitle(e.target.value);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    tag: Tag
  ) => {
    const label = tag.content;
    if (!label) return;
    if (e.target.checked) {
      setCheckboxes([...checkboxes, tag]);
    } else {
      setCheckboxes(checkboxes.filter((checkbox) => checkbox.id !== tag.id));
    }
  };

  const createOrganization = async () => {
    const response = await client.models.Organization.create(
      { content: currOrg, title: currTitle },
      { selectionSet: ["content", "id", "events.*"] }
    );
    const data = response.data;

    if (data?.id && checkboxes.length) {
      checkboxes.forEach(async (tag: Tag) => {
        await client.models.OrganizationTag.create({
          organizationId: data?.id,
          tagId: tag.id,
        });
      });
    }
  };

  const handleOrganizationDelete = async (id: string) => {
    await client.models.Organization.delete({ id });
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  return (
    <Authenticator>
      {({ user }) => (
        <main>
          <Navbar />
          <MyTags tags={tags} />
          <Box
            sx={{
              pl: 2,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography level="h2">My organizations</Typography>
            <Typography level="title-lg">Add an organization</Typography>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <Input
                  value={currTitle}
                  placeholder="title"
                  onChange={handleTitleChange}
                />
              </FormControl>
              <FormControl>
                <Input
                  value={currOrg}
                  placeholder="description"
                  onChange={handleChange}
                />
              </FormControl>
              {tags &&
                tags.map((tag) => (
                  <Checkbox
                    key={tag.content}
                    label={tag.content}
                    onChange={(e) => handleCheckboxChange(e, tag)}
                    color="primary"
                  />
                ))}

              <Button onClick={createOrganization}>Save</Button>
            </Stack>
          </Box>
          <List
            sx={{
              py: 0,
              "--ListItem-paddingY": "0.75rem",
              "--ListItem-paddingX": "1rem",
            }}
          >
            {organizations.map((organization) => (
              <OrganizationRow
                key={organization.id}
                organization={organization}
                user={user}
                onDelete={handleOrganizationDelete}
              />
            ))}
          </List>
        </main>
      )}
    </Authenticator>
  );
}
