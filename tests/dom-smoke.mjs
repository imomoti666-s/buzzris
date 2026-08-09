import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM, VirtualConsole } from "jsdom";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const runtimeErrors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", error => runtimeErrors.push(error));
virtualConsole.on("error", (...args) => runtimeErrors.push(new Error(args.join(" "))));

const dom = new JSDOM(html, {
  url: "https://buzzris.local/",
  runScripts: "dangerously",
  pretendToBeVisual: true,
  virtualConsole,
  beforeParse(window) {
    window.alert = () => {};
    window.confirm = () => true;
    window.prompt = () => null;
    window.scrollTo = () => {};
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
    window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    window.URL.createObjectURL = () => "blob:buzzris-test";
    window.URL.revokeObjectURL = () => {};
    window.HTMLElement.prototype.scrollIntoView = () => {};
  }
});

await new Promise(resolve => {
  if (dom.window.document.readyState === "complete") resolve();
  else dom.window.addEventListener("load", resolve, { once: true });
});

const { document } = dom.window;
assert.equal(document.title, "バズリス v0.30.0 GITHUB REBUILD");
assert.ok(document.querySelector("#homeScreen.active"), "home screen initialized");
assert.match(document.querySelector("#ownedTotal").textContent, /^\d+$/);

document.querySelector("#cardAuditBtn").click();
assert.equal(dom.window.__buzzCardAuditReport.totalCards, 61);
assert.equal(dom.window.__buzzCardAuditReport.errors.length, 0);
document.querySelector("[data-v278-close-audit]").click();

document.querySelector('[data-home-tab="character"]').click();
assert.ok(document.querySelector("#homeTabCharacter.active"), "character tab opens");

const hainariBase = document.querySelector('[data-character-base="hainari"]');
assert.ok(hainariBase, "Hainari character button rendered");
hainariBase.click();

assert.match(document.querySelector("#characterCurrentLabel").textContent, /灰鳴兄弟/);
assert.equal(document.querySelectorAll("#characterCardGrid .character-unlock-card").length, 5);
assert.match(document.querySelector("#characterCardGrid").textContent, /兄札「投稿を飲み込む」/);
assert.match(document.querySelector("#characterCardGrid").textContent, /双札「ふたりで一人」/);

const start = document.querySelector("#startRunBtn");
assert.equal(start.disabled, false, "default standard deck is playable");
start.click();

assert.ok(document.querySelector("#gameScreen.active"), "run screen opens");
assert.equal(document.querySelector("#runCharacterName").textContent, "灰鳴兄弟");
assert.equal(document.querySelector("#hainariComboChip").hidden, false);
assert.match(document.querySelector("#hainariComboChip").textContent, /👣0\/3・未接続/);
assert.ok(document.querySelectorAll("#hand .card, #handCards .card, [data-uid]").length > 0, "opening hand rendered");

const saveKeys = Array.from({ length: dom.window.localStorage.length }, (_, index) => dom.window.localStorage.key(index));
const activeSaveKey = saveKeys.find(key => key && !key.includes("backup"));
const storedSave = JSON.parse(dom.window.localStorage.getItem(activeSaveKey));
assert.equal(storedSave.saveVersion, 30);
assert.ok(Array.isArray(storedSave.unlockedCharacterCards));

const seriousErrors = runtimeErrors.filter(error => !/Not implemented: navigation/.test(error.message));
assert.deepEqual(seriousErrors.map(error => error.message), []);

dom.window.close();
console.log("Buzzris DOM smoke test passed: home, Hainari selection, workshop, and run start OK.");
