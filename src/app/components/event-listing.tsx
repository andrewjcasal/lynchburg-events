import { Box, Card, Typography } from "@mui/joy";
import { OptionsDropdown } from "./options-dropdown";
import { Event } from "../types";
import dayjs from "dayjs";

interface EventListingProps {
  event: Event;
  deleteEvent: (id: string) => void;
  isAdmin?: boolean;
}

export const EventListing = ({
  event,
  deleteEvent,
  isAdmin,
}: EventListingProps) => {
  return (
    <Card key={event.id} sx={{ width: 320, p: 1 }} size="md">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 1 }}>
          <Typography level="title-sm">
            {event.content} -{" "}
            {Number(event.cost) !== 0 ? `$${event.cost}` : "FREE"}
          </Typography>
          <Typography level="body-xs">
            {dayjs(event.startTime).format("MMM D, YYYY h:mma")}
          </Typography>
        </Box>
        {isAdmin && <OptionsDropdown deleteEvent={deleteEvent} id={event.id} />}
      </Box>
    </Card>
  );
};
