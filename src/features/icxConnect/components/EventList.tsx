import React from 'react';
import { Container, Box, Text, Paper, SimpleGrid } from '@mantine/core';
import EventCard from '~/components/EventCard';
import { useGetEventsQuery } from '../api/useGetEvents';
import { parseEventDate } from '../utils';
import { EventListSkeleton } from './EventListSkeleton';
import { EventScheduleType } from '../types';
import { navigate } from 'gatsby';
import { useMediaQuery } from '@mantine/hooks';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1) || '';
}

export const EventList: React.FC<{}> = () => {
  const { data: events, isLoading } = useGetEventsQuery({
    type: EventScheduleType.UPCOMING,
  });

  const mobileScreen = useMediaQuery('(max-width: 30em)');
  const tabScreen = useMediaQuery('(min-width: 30em) and (max-width: 60em)');

  return (
    <Box sx={{ minHeight: '100vh' }} pb="lg">
      <Paper
        sx={{
          backgroundImage: 'url(/img/events-banner.png)',
          backgroundPosition: mobileScreen
            ? '-1200px 0px'
            : tabScreen
            ? '-1000px 0px'
            : '-500px 0px',
          height: '20rem',
          borderRadius: '0px',
        }}>
        <Container sx={{ height: '100%' }} size="ll">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              paddingTop: '50px',
            }}>
            <Text color="#FFF" fz={mobileScreen ? 26 : 30} fw="bolder">
              ICX Connect
            </Text>
            <Text color="#F1F3F5" fz={mobileScreen ? 14 : 16} maw={420} fw="lighter">
              Jadi bagian dari komunitas angel investor, VCs, dan founder startup. Dapatkan akses ke
              event ekslusif.
            </Text>
          </Box>
        </Container>
      </Paper>
      <Container size="ll">
        <Box my={60}>
          <SimpleGrid
            breakpoints={[
              { minWidth: 'xs', cols: 1 },
              { minWidth: 'sm', cols: 2 },
              { minWidth: 'md', cols: 3 },
              { minWidth: 'lg', cols: 4 },
            ]}>
            {isLoading ? (
              <EventListSkeleton />
            ) : !events?.data.length ? (
              <Text>No upcoming events</Text>
            ) : (
              events.data.map(event => {
                const [eventDate, eventTime] = parseEventDate(event?.startDate, event?.endDate);

                return (
                  <EventCard
                    onClick={() => navigate(`/events/${event.id}`)}
                    key={event.id}
                    image={event.coverImage}
                    title={event.title}
                    date={eventDate}
                    time={eventTime}
                    eventType={capitalizeFirstLetter(event.type)}
                  />
                );
              })
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
