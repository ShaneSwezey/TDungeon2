import { gql } from "@apollo/client";

export const HERO_GEAR_QUERY = gql`
    query HEROANDGEAR($heroId: String!) {
        hero(heroId: $heroId) {
            id
            name
            type
            crit
            dodge
            block
            attackPower
            stamina {
                maxHitPoints
                hitPoints
            }
            armor {
                name
                type
                slot
                hitPoints
                rarity
                description
            }
            weapons {
                name
                type
                rarity
                damage {
                    high
                    low
                }
                description
            }
        }
        
        inventory(heroId: $heroId) {
            heroId
            gold
            armorInventory {
                name
                type
                slot
                rarity
                hitPoints
            }
            weaponInventory {
                name
                type
                rarity
                damage {
                    low
                    high
                }
            }
        }
}`;