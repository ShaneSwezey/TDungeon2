import { ItemRarity } from '../rarity';
import { Weapon, WeaponType } from ".";

interface OneHandedAxe extends Weapon {
    name: OneHandedAxeName;
    type: WeaponType.ONEHANDEDAXE
}

export enum OneHandedAxeName {
    RUSTYAXE = "Rusty Axe",
    HATCHET = "Hatchet",
    LUMBERWICKER = "Lumber Wicker"
}

export const oneHandedAxeFactory = (oneHandedAxeName: string): OneHandedAxe => {
    switch(oneHandedAxeName) {
        case OneHandedAxeName.RUSTYAXE:
            return rustyAxe();
        case OneHandedAxeName.HATCHET:
            return hatchet();
        case OneHandedAxeName.LUMBERWICKER:
            return lumberWicker();
        default:
            throw new Error(`One handed axe: ${oneHandedAxeName} was not found`);
    }
}

const rustyAxe = (): OneHandedAxe => ({
    name: OneHandedAxeName.RUSTYAXE,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 2,
        high: 4,
    },
    effects: []
});

const hatchet = (): OneHandedAxe => ({
    name: OneHandedAxeName.HATCHET,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.COMMON,
    damage: {
        low: 3,
        high: 6,
    },
    effects: []
});

const lumberWicker = (): OneHandedAxe => ({
    name: OneHandedAxeName.LUMBERWICKER,
    type: WeaponType.ONEHANDEDAXE,
    rarity: ItemRarity.UNCOMMON,
    damage: {
        low: 6,
        high: 10,
    },
    effects: []
});