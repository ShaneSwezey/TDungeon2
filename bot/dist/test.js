"use strict";
var ItemRarity;
(function (ItemRarity) {
    ItemRarity["COMMON"] = "Common";
    ItemRarity["UNCOMMON"] = "Uncommon";
    ItemRarity["RARE"] = "Rare";
    ItemRarity["EPIC"] = "Epic";
    ItemRarity["LEGENDARY"] = "Legendary";
})(ItemRarity || (ItemRarity = {}));
;
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const probabilityDistributor = (categories, weights) => {
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
};
const categories = [ItemRarity.RARE, ItemRarity.UNCOMMON, ItemRarity.COMMON];
const weights = [1, 10, 20];
const category = probabilityDistributor(categories, weights);
console.log('category:', category);
