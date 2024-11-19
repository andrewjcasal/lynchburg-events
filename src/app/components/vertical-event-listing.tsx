"use client";

import { ListDivider, ListItem, Typography } from "@mui/joy";
import dayjs from "dayjs";

interface VerticalEventListingProps {
  event: any;
}

export const VerticalEventListing = ({ event }: VerticalEventListingProps) => {
  return (
    <>
      <ListItem sx={{ p: 2 }}>
        <div>
          <Typography level="title-sm">{event.content}</Typography>
          <Typography level="body-sm">
            {dayjs(event.startTime).format("MMM D, YYYY h:mma")} |{" "}
            {Number(event.cost) !== 0 ? `$${event.cost}` : "FREE"}
          </Typography>
        </div>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
    </>
  );
};
