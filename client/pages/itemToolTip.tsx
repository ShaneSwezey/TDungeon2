import { NextPage } from 'next';
import React, { useState } from 'react';
import { Armor, Weapon } from '../interfaces';
import styles from '../styles/tooltip.module.css';

const getItemTitleCss = (rarity: string) => {
    switch(rarity) {
        case "Uncommon":
            return styles.itemTitleUncommon;
        case "Rare":
            return styles.itemTitleRare;
        case "Epic":
            return styles.itemTitleEpic;
        default:
            return styles.itemTitleCommon;
    }
}

interface ArmorItemProps {
    armor: Armor;
}

const ArmorItem: NextPage<ArmorItemProps> = ({ armor }: ArmorItemProps) => (
    <div className={styles.Tooltip}>
        <p className={getItemTitleCss(armor.rarity)}>{armor.name}</p>
        <p className={styles.itemSlot}>{armor.type} {armor.slot}</p>
        HP: {armor.hitPoints}
    </div>
);

interface WeaponItemProps {
    weapon: Weapon;
}

const WeaponItem: NextPage<WeaponItemProps> = ({ weapon }: WeaponItemProps) => {
    console.log('weapon:', weapon);
    return ( 
        <div className={styles.Tooltip}>
            <p className={getItemTitleCss(weapon.rarity)}>{weapon.name}</p>
            <p>{weapon.type}</p>
            <p>Dmg: {weapon.damage.low} - {weapon.damage.high}</p>
        </div> 
    );
};

interface ItemToolTipProps {
    item: any; // fix this Armor | Weapon
    delay?: number;
    direction?: string; 
}

const ItemToolTip = (props: any) => {
    let timeout: any;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 150);
    };
    
    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div
            className={styles.TooltipWrapper}
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
        {props.children}
        {
            props.item && active ?
                props.item.slot ?
                    <ArmorItem armor={props.item} />
                    :
                    <WeaponItem weapon={props.item} />
            :
                <></>
        }
    </div>
    );
};

export default ItemToolTip;