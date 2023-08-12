import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found zzzzz!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const eventId = params.eventId;

  const response = await fetch(
    `https://nextjs-course-fe9c6-default-rtdb.firebaseio.com/events/${eventId}.json`
  );

  const data = await response.json();

  return {
    props: {
      event: data,
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  // Fetch all the event ids from the external API
  const response = await fetch(
    "https://nextjs-course-fe9c6-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  // Generate the dynamic paths for each event using the API data
  const paths = Object.keys(data).map((eventId) => ({
    params: { eventId },
  }));

  return {
    paths,
    fallback: false, // Set fallback: false if you want to show a 404 page for non-existing ids
  };
}

export default EventDetailPage;
