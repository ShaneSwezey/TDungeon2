"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisGraph = void 0;
var redisgraph_js_1 = __importDefault(require("redisgraph.js"));
var _1 = require(".");
var RedisGraph = /** @class */ (function () {
    function RedisGraph() {
        var Graph = redisgraph_js_1.default.Graph;
        this.battleGraph = new Graph("game", _1.RedisConfig.host, _1.RedisConfig.port);
    }
    RedisGraph.prototype.createBattle = function (battleId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, record, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("CREATE (:battle { id: '" + battleId + "' })")];
                    case 1:
                        res = _a.sent();
                        while (res.hasNext()) {
                            record = res.next();
                            console.dir(record, { depth: null });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('[createBattle]', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.getBattle = function (battleId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, record, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("MATCH (b:battle { id: '" + battleId + "' }) return b")];
                    case 1:
                        res = _a.sent();
                        while (res.hasNext()) {
                            record = res.next();
                            console.dir(record, { depth: null });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('[getBattle]', error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.createRoundAndAttach = function (battleId, roundNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var res, record, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("\n                MATCH (b:battle { id: '" + battleId + "' })\n                CREATE (r:round { number: " + roundNumber + ", createdAt: timestamp() })\n                CREATE (b)-[rel:HAS]->(r)\n            ")];
                    case 1:
                        res = _a.sent();
                        while (res.hasNext()) {
                            record = res.next();
                            console.dir(record, { depth: null });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('[createRoundAndAttach]', error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.getRound = function (battleId, roundNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var res, record, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("\n                MATCH (r:round { number: " + roundNumber + " })<-[rel:HAS]-(b:battle { id: '" + battleId + "' })\n                RETURN r\n            ")];
                    case 1:
                        res = _a.sent();
                        while (res.hasNext()) {
                            record = res.next();
                            console.dir(record, { depth: null });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('[getRound]', error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Should improve for bulk query
    // Still learning cypher language
    RedisGraph.prototype.loadHero = function (hero) {
        return __awaiter(this, void 0, void 0, function () {
            var armorPromises, weaponPromises, error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.battleGraph.query("MERGE (h:hero { name: '" + hero.name + "', type:'" + hero.type + "' })")];
                    case 1:
                        _a.sent();
                        armorPromises = hero.armor.map(function (armor) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.battleGraph.query("\n                    MERGE (h:hero { name: '" + hero.name + "' })\n                    MERGE (a:armor { name: '" + armor.name + "', type: '" + armor.type + "', slot: '" + armor.slot + "' })\n                    MERGE (h)-[r:IS_WEARING_ARMOR]->(a)\n                ")];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        weaponPromises = hero.weapons.map(function (weapon) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.battleGraph.query("\n                    MERGE (h:hero { name: '" + hero.name + "' })\n                    MERGE (w:weapon { name: '" + weapon.name + "', type: '" + weapon.type + "' })\n                    MERGE (h)-[r:IS_WEARING_WEAPON]->(w)\n                ")];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all([armorPromises, weaponPromises])];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error('[loadHero]', error_5);
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.getHero = function (heroName, type) {
        return __awaiter(this, void 0, void 0, function () {
            var res, record, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("\n                MATCH (h:hero { name: '" + heroName + "', type: '" + type + "' }) \n                MATCH (h)-[:IS_WEARING_WEAPON|:IS_WEARING_ARMOR]->(g)\n                RETURN h, g\n            ")];
                    case 1:
                        res = _a.sent();
                        while (res.hasNext()) {
                            record = res.next();
                            console.dir(record.values(), { depth: null });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('[getHero]', error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.attachHeroToBattle = function (hero, battleId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("\n                MATCH (h:hero { name: '" + hero.name + "', type: '" + hero.type + "' })\n                MATCH (b:battle { id: '" + battleId + "' })\n                MERGE (h)-[r:PARTICIPATING_IN]->(b)\n            ")];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error('[attachHeroToBattle]', error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RedisGraph.prototype.setHeroToAttack = function (hero, roundNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.battleGraph.query("\n                MATCH (h:hero { name: '" + hero.name + "', type: '" + hero.type + "' })\n                MATCH (r:round { number: " + roundNumber + " })\n                MERGE (h)-[rel:IS_ATTACKING]->(r)\n            ")];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        console.error('[setHeroToAttack]', error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RedisGraph;
}());
exports.RedisGraph = RedisGraph;
