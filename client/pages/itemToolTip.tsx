import React, { useState } from 'react';
import { ItemRarity } from '../enums/item';
import { IArmor } from '../interfaces/armor';
import { IWeapon } from '../interfaces/weapon';
import styles from '../styles/tooltip.module.css';
import { formatArmorSlot, formatArmorType } from '../utils/gear';
import { formatWeaponType } from '../utils/weapon';

const getItemTitleCss = (rarity: ItemRarity) => {
    switch(rarity) {
        case ItemRarity.UNCOMMON:
            return styles.itemTitleUncommon;
        case ItemRarity.RARE:
            return styles.itemTitleRare;
        case ItemRarity.EPIC:
            return styles.itemTitleEpic;
        default:
            return styles.itemTitleCommon;
    }
}

interface ArmorItemProps {
    armor: IArmor;
}

const ArmorItem = ({ armor }: ArmorItemProps) => (
    <div className={styles.Tooltip}>
        <p className={getItemTitleCss(armor.rarity)}>{armor.name}</p>
        <p className={styles.itemSlot}>{formatArmorType(armor.type)} {formatArmorSlot(armor.slot)}</p>
        <p>Hp: {armor.hitPoints}</p>
        { armor.attackPower && <p>Ap: {armor.attackPower}</p> }
    </div>
);

interface WeaponItemProps {
    weapon: IWeapon;
}

const WeaponItem  = ({ weapon }: WeaponItemProps) => (
    <div className={styles.Tooltip}>
        <p className={getItemTitleCss(weapon.rarity)}>{weapon.name}</p>
        <p>{formatWeaponType(weapon.type)}</p>
        <p>Dmg: {weapon.damage.low} - {weapon.damage.high}</p>
        { weapon.crit && <p>Crit: {weapon.crit.chance}%</p> }
        { weapon.flurry && <p>Flurry: {weapon.flurry.chance}% x({weapon.flurry.num.low}-{weapon.flurry.num.high})</p>}
        { weapon.cleave && <p>Cleave: {weapon.cleave.chance}% x({weapon.cleave.num.low}-{weapon.cleave.num.high})</p>}
    </div> 
);

interface ItemToolTipProps {
    item?: IArmor | IWeapon;
    type: string;
    delay?: number;
    direction?: string; 
    battleEvent?: boolean
    children: React.ReactNode
}

const ItemToolTip = (props: ItemToolTipProps) => {
    let timeout: NodeJS.Timeout;
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
            className={props.battleEvent ? styles.TooltipBattleEventWrapper : styles.TooltipWrapper}
            // When to show the tooltip
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {props.children}
            {
                props.item && active ?
                    props.type === "Armor" ?
                        <ArmorItem armor={props.item as IArmor} />
                        :
                        <WeaponItem weapon={props.item as IWeapon} />
                :
                    <></>
            }
        </div>
    );
};

export default ItemToolTip;