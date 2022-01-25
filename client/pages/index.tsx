import React, { useState } from 'react'
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Button, Stack } from "@chakra-ui/react";
import Header from '../components/header';
import Battles from '../components/battle';
import Heroes from '../components/heroes';
import Admin from '../components/admin/admin';

enum Section {
  ADMIN = "Admin",
  BATTLES = "Battles",
  HEROES = "Heroes",
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState<Section>(Section.BATTLES);

  const setShowClick = (newSection: Section) => {
    if (show === newSection) return;
    setShow(newSection);
  }

  return (
    <>
      <Header />
      {
        session &&
        <Stack direction="row" mt={5} ml={7} spacing={5}>
          <Button onClick={() => setShowClick(Section.BATTLES)}>Battles</Button>
          <Button onClick={() => setShowClick(Section.HEROES)}>Heroes</Button>
          {
            session.user!.name === "SlipperyToads" &&
            <Button  
              mr={5} 
              backgroundColor="#E53E3E"
              onClick={() => setShowClick(Section.ADMIN)}
            >
              Admin
            </Button>
          }
        </Stack>
      }
      {
        show === Section.BATTLES &&
        <Battles />
      }
      {
        show === Section.HEROES &&
        <Heroes name={session!.user!.name!.toLowerCase()} />
      }
      {
        show === Section.ADMIN &&
        <Admin />
      }
    </>
  );
}

export default Home;
