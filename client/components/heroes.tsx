import { useState } from 'react';
import HeroSelection  from './heroSelection';
import Gear from './gear/gear';
import { HeroType } from '../enums/hero';

enum Section {
    SELECTION = "SELETION",
    INVENTORY = "INVENTORY"
}

interface Props {
    name: string;
}

const Heroes = ({ name }: Props) => {
    const [show, setShow] = useState<Section>(Section.SELECTION);
    const [selectedHeroId, setSelectedHeroId] = useState<string | undefined>(undefined);
    const [selectedHeroType, setSelectedHeroType] = useState<HeroType | undefined>(undefined);

    const openInventory = (heroId: string, heroType: HeroType) => {
        setSelectedHeroId(heroId);
        setSelectedHeroType(heroType);
        setShow(Section.INVENTORY);
    }

    const closeInventory = () => setShow(Section.SELECTION);

    return (
        <>
        {
            show === Section.SELECTION &&
            <HeroSelection name={name} openInventory={openInventory} />
        }
        {
            show === Section.INVENTORY &&
            <Gear closeInventory={closeInventory} heroId={selectedHeroId!} heroType={selectedHeroType!} />
        }
        </>
    )
}

export default Heroes;