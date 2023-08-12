import EventList from "../components/events/event-list";

function HomePage({ event }) {

  
  return (
    <div>
      <EventList items={event} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-fe9c6-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  const featuredEvents = events.filter((event) => event.isFeatured);

  // const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      event: featuredEvents,
    },
    revalidate: 1800
  };
}

export default HomePage;
