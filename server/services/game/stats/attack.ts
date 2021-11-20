export interface MonsterAttack {
    high: number;
    low: number;
    attackPower: number;
    type: MonsterAttackType;
}

export enum MonsterAttackType {
    SLASH = "Slash",
    STABBED = "Stabbed",
    PUNCHED = "Punched",
    SHANKED = "Shanked",
    SCRATCH = "Scratched"
}