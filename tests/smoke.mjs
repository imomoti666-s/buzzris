import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const manifest = JSON.parse(await readFile(new URL("manifest.webmanifest", root), "utf8"));
const worker = await readFile(new URL("service-worker.js", root), "utf8");

function sourceBetween(start, end) {
  const from = html.indexOf(start);
  const to = html.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `source block missing: ${start}`);
  return html.slice(from, to);
}

function functionSource(name) {
  const marker = `function ${name}(`;
  const start = html.indexOf(marker);
  assert.ok(start >= 0, `${name} missing`);
  const body = html.indexOf("{", start);
  let depth = 0;
  for (let i = body; i < html.length; i += 1) {
    if (html[i] === "{") depth += 1;
    if (html[i] === "}") depth -= 1;
    if (depth === 0) return html.slice(start, i + 1);
  }
  throw new Error(`${name} is not closed`);
}

const context = {
  state: null,
  log() {},
  drawCount: 0,
  draw(n) { context.drawCount += n; },
  addScore(s, value) { s.score += value; }
};
vm.createContext(context);

const cardSource = sourceBetween("const cardPool = [", "const relicRarities");
vm.runInContext(`${cardSource}\nglobalThis.cards = cardPool; globalThis.cardSets = characterCardSets;`, context);
vm.runInContext(`${sourceBetween("const characterDefs = {", "const initialDeckIds")}\nglobalThis.characters = characterDefs;`, context);
vm.runInContext(`${functionSource("hainariStep")}\nglobalThis.hainariStep = hainariStep;`, context);
vm.runInContext(`${functionSource("baseScoreLabelForCard")}\nglobalThis.baseScoreLabelForCard = baseScoreLabelForCard;`, context);
vm.runInContext(`${functionSource("v278DirectScoreClaim")}\nglobalThis.directScoreClaim = v278DirectScoreClaim;`, context);

const cards = context.cards;
const byId = id => cards.find(card => card.id === id);

assert.match(html, /v0\.30\.0 \/ GITHUB REBUILD/);
assert.equal((html.match(/portrait: "assets\/imomoti\.png"/g) || []).length, 2);
assert.doesNotMatch(html, /data:image\/png;base64/);
assert.equal(cards.length, 61, "46 existing + 15 character cards");
assert.equal(new Set(cards.map(card => card.id)).size, cards.length, "card ids are unique");
assert.deepEqual(Object.fromEntries(Object.entries(context.cardSets).map(([key, ids]) => [key, ids.length])), {
  nameless: 5,
  imomoti: 5,
  hainari: 5
});

for (const [baseKey, ids] of Object.entries(context.cardSets)) {
  assert.deepEqual(Array.from(ids, id => byId(id).characterBaseKey), Array(5).fill(baseKey));
  assert.deepEqual(Array.from(ids, id => byId(id).fragmentCost), [0, 0, 2, 3, 5]);
  assert.ok(Array.from(ids).slice(0, 2).every(id => byId(id).starter));
}

assert.equal(Object.keys(context.characters).length, 5);
assert.ok(Object.values(context.characters).every(character => character.baseDeckIds.length === 7));
assert.equal(context.characters.hainari_brothers.baseKey, "hainari");
assert.ok(context.characters.hainari_brothers.baseDeckIds.includes("hainari_swallow_post"));
assert.ok(context.characters.hainari_brothers.baseDeckIds.includes("hainari_follow_back"));
assert.equal(byId("hainari_swallow_post").name, "兄札「投稿を飲み込む」");
assert.equal(byId("hainari_follow_back").name, "弟札「兄の背を追う」");

context.state = {
  characterFlags: {},
  score: 0,
  idea: 0,
  empathy: 0,
  pendingPulses: []
};
context.drawCount = 0;
byId("hainari_swallow_post").play(context.state);
byId("hainari_follow_back").play(context.state);
assert.equal(context.state.characterFlags.hainariChain, 1);
assert.equal(context.state.characterFlags.hainariLast, "younger");
assert.equal(context.state.idea, 2);
assert.equal(context.state.empathy, 1);
assert.equal(context.drawCount, 1);

const missingScoreFormula = Array.from(cards)
  .filter(card => context.directScoreClaim(card) && !context.baseScoreLabelForCard(card))
  .map(card => card.id);
assert.deepEqual(missingScoreFormula, []);

assert.match(html, /state\.stageBuffs\.trust > 0/);
assert.match(html, /const V030_SAVE_SCHEMA = 30/);
assert.equal(manifest.description, "バズリス v0.30.0 GITHUB REBUILD PWA");
assert.match(worker, /buzzris-v0-30-0-github-rebuild/);

console.log("Buzzris v0.30.0 smoke test passed: 61 cards, 3 character sets, Hainari chain OK.");
