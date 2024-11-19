import { getEvents } from "../api";
import { VerticalEventListing } from "../components/vertical-event-listing";
import { Layout } from "../components/layout";
import { List } from "@mui/joy";

export default async function Page() {
  const events = await getEvents();
  return (
    <Layout>
      <List>
        {events
          .filter((e) => e)
          .map((event) => (
            <VerticalEventListing key={event.id} event={event} />
          ))}
      </List>
    </Layout>
  );
}
