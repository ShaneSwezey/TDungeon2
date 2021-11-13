import { heroFactory } from "../../creation/hero";
import { Hero, HeroType} from "../../hero"
import { getRandomInt } from "../../utils/math";
import { name } from 'faker';

export const generateHeroes = (numberOfHeroes: number) => {
    const heroes: Hero[] = [];
    for (let i = 0; i < numberOfHeroes; i++) {
        const heroType = selectRandomHeroType();
        heroes.push(heroFactory({ name: name.firstName(), type: heroType }));
    }
    return heroes
}

const selectRandomHeroType = () => {
    const randomInt = getRandomInt(1, 3);
    switch(randomInt) {
        case 1:
            return HeroType.Melee;
        case 2:
            return HeroType.Ranged;
        default:
            return HeroType.Caster;
    }
}   