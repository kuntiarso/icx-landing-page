import React, { FC } from 'react';
import {
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  MediaQuery,
  Stack,
  Text,
  TypographyStylesProvider,
  createStyles,
} from '@mantine/core';
import { GatsbyImage } from 'gatsby-plugin-image';
import { HeroSectionProps } from '../../types';

import HeroMotion from '~/images/hero-motion.gif';

// --------------------------------------- styles

const useStyles = createStyles(theme => ({
  root: {
    height: '100vh',
    color: '#fff',
    backgroundColor: '#000',
    backgroundImage: `url(${HeroMotion})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom right',
    [theme.fn.smallerThan('md')]: {
      height: 'auto',
      backgroundPosition: '82% 50%',
    },
  },

  container: {
    height: '100%',
    paddingTop: 80,
    [theme.fn.smallerThan('md')]: {
      paddingTop: 64,
    },
  },

  absoluteVerticalCenter: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    [theme.fn.smallerThan('md')]: {
      position: 'relative',
    },
  },

  copywriting: {
    width: '100%',
    alignItems: 'flex-start',
    [theme.fn.smallerThan('md')]: {
      alignItems: 'center',
    },
  },

  title: {
    color: 'inherit',
    maxWidth: 600,
    fontSize: 56,
    fontWeight: 600,
    lineHeight: '72px',
    [theme.fn.smallerThan('md')]: {
      maxWidth: 'initial',
      fontSize: 32,
      lineHeight: '40px',
      textAlign: 'center',
    },
  },

  subtitle: {
    maxWidth: 500,
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '32px',
    [theme.fn.smallerThan('md')]: {
      maxWidth: 300,
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
    },
  },

  download: {
    [theme.fn.smallerThan('md')]: {
      margin: '0 auto',
    },
  },

  appImage: {
    width: '390px',
    position: 'absolute',
    left: 60,
    bottom: -50,
    [theme.fn.smallerThan('lg')]: {
      width: 'auto',
      maxWidth: '390px',
    },
    [theme.fn.smallerThan('md')]: {
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
}));

// -------------------------------------- components

export const HeroSection: FC<HeroSectionProps> = ({ ...props }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Container size="ll" className={classes.container}>
        <Grid gutter={0} sx={{ height: '100%', position: 'relative' }}>
          <MediaQuery smallerThan="md" styles={{ paddingTop: 70 }}>
            <Grid.Col xs={12} md={7}>
              <Flex
                align={{ xs: 'flex-start', md: 'center' }}
                justify={{ xs: 'center', md: 'flex-start' }}
                sx={{ height: '100%' }}>
                <Stack spacing={32} className={classes.copywriting}>
                  <TypographyStylesProvider className={classes.title}>
                    <div dangerouslySetInnerHTML={{ __html: props.title }} />
                  </TypographyStylesProvider>
                  <Text className={classes.subtitle}>{props.subtitle}</Text>
                  <Group spacing="xl" align="center" noWrap className={classes.download}>
                    {props.download.map(({ logo, link, name }) => (
                      <Box key={link}>
                        {/* <GatsbyImage image={logo.childImageSharp.gatsbyImageData} alt={name} /> */}
                        <Image src={logo} maw={200} mah={59} />
                      </Box>
                    ))}
                  </Group>
                </Stack>
              </Flex>
            </Grid.Col>
          </MediaQuery>
          <Grid.Col
            xs={12}
            md={5}
            sx={theme => ({
              position: 'relative',
              [theme.fn.smallerThan('md')]: {
                padding: '0 32px',
              },
            })}>
            <Box className={classes.appImage}>
              {/* <GatsbyImage image={props.appImage.childImageSharp.gatsbyImageData} alt="icx-app" /> */}
              <Image src={props.appImage} />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};