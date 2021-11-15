import { Flex } from '@chakra-ui/layout';
import { gql, useLazyQuery } from "@apollo/client";
import client from "../apollo-client";
import type { NextPage } from 'next';
import Header from './header';
import BattleEvents from './battleEvents';
import { Battle, BattleEvent } from '../interfaces';
import { Battles } from './battle';
import { useState } from 'react';

interface Props {
  battles: Battle[]
  isLoading: boolean;
}

interface QueryData {
  battleEvents: BattleEvent[];
}

const Hero_Fragment = gql`
  fragment HeroFragment on Hero {
    name
    type
    stamina {
      hitPoints
      maxHitPoints
    }
    armor {
      name
      type
      slot
      hitPoints
    }
  }
`;

const Hero_Attack_Fragment = gql`
  fragment HeroAttackFragment on HeroAttackType {
    name
    type
    stamina {
      hitPoints
      maxHitPoints
    }
    armor {
      name
      type
      slot
      hitPoints
    }
    weapon {
      name
      type
      damage {
        low
        high
      }
    }
  }
`;

const Monster_Fragment = gql`
  fragment MonsterFragment on Monster {
    id
    type
    stamina {
      hitPoints
      maxHitPoints
    }
    attack {
      low
      high
    }
  }
`;

const Battle_Events_Query = gql`
  ${Hero_Fragment}
  ${Monster_Fragment}
  ${Hero_Attack_Fragment}
  query BattleEvents($battleId: String!) {
    battleEvents(battleId: $battleId) {
      battleId
      round
      iteration
      event {
        type
        value
        isCrit
        deathBlow
        to {
          ...HeroFragment
          ...MonsterFragment
        }
        from {
          ...HeroAttackFragment
          ...MonsterFragment
        }
      }
    }
  }
`;


const Home: NextPage<Props> = ({ battles }: Props) => {
  const [shouldDisplayEvents, setShouldDisplayEvents] = useState(false);

  const [getBattleEvents, {  loading, error, data }] = useLazyQuery<QueryData>(Battle_Events_Query)
  console.log("dater:", data);

  if (loading) return <div>Loading...</div>

  const onClick = (battleId: string) => {
    getBattleEvents({ variables: { battleId } });
    setShouldDisplayEvents(true);
  }

  

  return (
    <>
      <Header />
      <Flex direction="row">
        <Battles battles={battles} onClick={onClick} />
        {
          !loading && data &&
          <BattleEvents battleEvents={data.battleEvents} />
        }
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const { data, loading } = await client.query({
    query: gql`
      query Battles {
        battles {
          _id
          winner
          createdAt
        }
      }
    `,
  });

  return {
    props: {
      battles: data.battles,
      isLoading: loading
    }
  }

}

export default Home;
