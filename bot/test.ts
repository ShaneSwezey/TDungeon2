enum ItemRarity {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary"
};

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const probabilityDistributor = (categories: ItemRarity[], weights: number[]) => {
    let totalWeight = 0;
    weights.forEach(weight => totalWeight += weight);
    const randomV = getRandomInt(0, totalWeight);

    let runningTotal = 0;
    for (let i = 0; i < weights.length; i++) {
        runningTotal += weights[i];
        if (randomV < runningTotal) {
            return categories[i];
        }
    }

    return categories[categories.length - 1];
}


const categories = [ItemRarity.RARE,ItemRarity.UNCOMMON,ItemRarity.COMMON];
const weights = [1,10,20];

const category = probabilityDistributor(categories, weights);
console.log('category:', category);