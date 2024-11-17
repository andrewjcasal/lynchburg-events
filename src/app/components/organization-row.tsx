"use client";

import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { AspectRatio, Box, ListDivider, ListItem, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import FolderIcon from "@mui/icons-material/Add";

import { Schema } from "../../../amplify/data/resource";
import { AddEventModal } from "./add-event-modal";
import { EventListing } from "./event-listing";
import { OptionsDropdown } from "./options-dropdown";
import { Organization } from "../types";

type Event = {
  id: string;
  content: string;
  cost: string;
  startTime: string;
  organizationId: string | null;
};

interface OrgEventsProps {
  organization: Organization;
  user?: {
    signInDetails?: {
      loginId?: string;
    };
  };
  onDelete?: (id: string) => void;
}

const client = generateClient<Schema>();

export const OrganizationRow = ({
  organization,
  user,
  onDelete,
}: OrgEventsProps) => {
  const [currEvent, setCurrEvent] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [events, setEvents] = useState<Event[]>(organization.events);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "currEvent":
        setCurrEvent(e.target.value);
        break;
      case "cost":
        setCost(e.target.value);
        break;
      case "startTime":
        setStartTime(e.target.value);
        break;
    }
  };

  const createEvent = async () => {
    const result = await client.models.Event.create(
      { content: currEvent, cost, startTime, organizationId: organization.id },
      { selectionSet: ["content", "id", "cost", "startTime"] }
    );
    const data = result.data as Event;
    setEvents([...events, data]);
    setCurrEvent("");
    setIsModalOpen(false);
  };

  const deleteEvent = async (id: string) => {
    await client.models.Event.delete({ id });
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <>
      <ListItem>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography level="title-md" sx={{ mt: 2, mb: 2 }}>
            {organization.content}

            {user?.signInDetails?.loginId === "andrewjcasal+1@gmail.com" && (
              <OptionsDropdown
                id={organization.id}
                deleteEvent={() => onDelete && onDelete(organization.id)}
              />
            )}
          </Typography>
          <Box
            sx={(theme) => ({
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              "& > div": {
                boxShadow: "none",
                "--Card-padding": "0px",
                "--Card-radius": theme.vars.radius.sm,
              },
            })}
          >
            {events &&
              events.map((event) => (
                <EventListing
                  key={event.id}
                  event={event}
                  deleteEvent={deleteEvent}
                  user={user}
                />
              ))}
            {user?.signInDetails?.loginId === "andrewjcasal+1@gmail.com" && (
              <Card>
                <AspectRatio
                  ratio="1"
                  sx={{ minWidth: 60 }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <div>
                    <FolderIcon />
                  </div>
                </AspectRatio>
                <AddEventModal
                  organization={organization}
                  currEvent={currEvent}
                  cost={cost}
                  startTime={startTime}
                  handleChange={handleChange}
                  createEvent={createEvent}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </Card>
            )}
          </Box>
        </Box>
      </ListItem>
      <ListDivider />
    </>
  );
};
