import React, { useState } from 'react'
import type { NextPage } from 'next';
import Header from './header';
import Battles from './battle';
import Gear from './gear';
import { useSession } from 'next-auth/react';
import { Button, Stack } from "@chakra-ui/react";

enum Page {
  BATTLES = "Battles",
  Inventory = "Inventory"
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [show, setShow] = useState("Battles");

  const setShowClick = (newShow: string) => {
    if (show === newShow) return;
    setShow(newShow);
  }

  return (
    <>
      <Header />
      {
        session &&
        <Stack direction="row" mt={5} ml={7} spacing={5}>
          <Button onClick={() => setShowClick(Page.BATTLES)}>Battles</Button>
          <Button onClick={() => setShowClick(Page.Inventory)}>Inventory</Button>
        </Stack>
      }
      {
        show === Page.BATTLES &&
        <Battles />
      }
      {
        show === Page.Inventory &&
        <Gear  name={session!.user!.name!.toLowerCase()}/>
      }
    </>
  );
}

export default Home;
