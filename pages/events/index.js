import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';


function AllEventsPage({events}) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps(){
  const response = await fetch(
    "https://nextjs-course-fe9c6-default-rtdb.firebaseio.com/events.json"
  ); 

  const data = await response.json();
   const events = [];
    for(const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
  return {
    props:{
      events,
    },
    revalidate:60
  }

}

export default AllEventsPage;
