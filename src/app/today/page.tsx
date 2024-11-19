import { getEvents } from "../api";
import { Container } from "../components/container";
import { VerticalEventListing } from "../components/vertical-event-listing";
import { List } from "@mui/joy";

export default async function Page() {
  const events = await getEvents();
  return (
    <Container>
      <List>
        {events
          .filter((e) => e)
          .map((event) => (
            <VerticalEventListing key={event.id} event={event} />
          ))}
      </List>
    </Container>
  );
}
