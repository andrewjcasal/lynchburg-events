import { Box, Card, Typography } from "@mui/joy";
import { OptionsDropdown } from "./options-dropdown";
import { Event } from "../types";

interface EventListingProps {
  event: Event;
  deleteEvent: (id: string) => void;
  user: any;
}

export const EventListing = ({
  event,
  deleteEvent,
  user,
}: EventListingProps) => {
  return (
    <Card key={event.id} sx={{ width: 320, p: 1 }} size="md">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Typography level="title-sm">
            {event.content} - {event.cost}
          </Typography>
          <Typography level="body-xs">{event.startTime}</Typography>
        </Box>
        {user?.signInDetails?.loginId === "andrewjcasal+1@gmail.com" && (
          <OptionsDropdown deleteEvent={deleteEvent} id={event.id} />
        )}
      </Box>
    </Card>
  );
};
