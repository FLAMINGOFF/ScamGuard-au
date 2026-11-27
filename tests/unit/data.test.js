// Content integrity checks for js/data.js. Run with: node --test tests/unit/
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const src = fs.readFileSync(path.join(__dirname, "../../js/data.js"), "utf8");
const ctx = {};
vm.runInNewContext(src + ";this.CONTACTS=CONTACTS;this.SCAMS=SCAMS;this.FLOW=FLOW;", ctx);
const { CONTACTS, SCAMS, FLOW } = ctx;

const CJK = /[㐀-鿿]/;

function* bilingual(obj, where = "") {
  if (!obj || typeof obj !== "object") return;
  if ("zh" in obj && "en" in obj) yield [obj, where];
  for (const [k, v] of Object.entries(obj)) yield* bilingual(v, `${where}.${k}`);
}

test("every bilingual field has non-empty zh and en of the same shape", () => {
  for (const [o, where] of bilingual({ CONTACTS, SCAMS, FLOW })) {
    assert.equal(Array.isArray(o.zh), Array.isArray(o.en), `${where}: zh/en shape differs`);
    if (Array.isArray(o.zh)) {
      assert.ok(o.zh.length > 0, `${where}: empty list`);
      assert.equal(o.zh.length, o.en.length, `${where}: zh has ${o.zh.length} items, en has ${o.en.length}`);
    } else {
      assert.ok(o.zh.trim() && o.en.trim(), `${where}: empty text`);
    }
  }
});

test("English text contains no Chinese and Chinese text contains Chinese", () => {
  for (const [o, where] of bilingual({ CONTACTS, SCAMS, FLOW })) {
    for (const s of [].concat(o.en)) assert.ok(!CJK.test(s), `${where}: Chinese in en: ${s}`);
    for (const s of [].concat(o.zh)) assert.ok(CJK.test(s), `${where}: no Chinese in zh: ${s}`);
  }
});

test("every phone number and link in CONTACTS has an official source recorded", () => {
  for (const [key, c] of Object.entries(CONTACTS)) {
    if (c.phone || c.url) assert.ok(c.source && c.source.startsWith("https://"), `${key}: missing source`);
    if (c.url) assert.ok(c.url.startsWith("https://"), `${key}: url must be https`);
    if (c.phone) assert.match(c.phone, /^[0-9 ]+$/, `${key}: phone must be digits and spaces`);
  }
});

test("known verified numbers have not drifted", () => {
  assert.equal(CONTACTS.emergency.phone, "000");
  assert.equal(CONTACTS.pal.phone, "131 444");
  assert.equal(CONTACTS.idcare.phone, "1800 595 160");
  assert.equal(CONTACTS.crimestoppers.phone, "1800 333 000");
  assert.equal(CONTACTS.tis.phone, "131 450");
});

test("scams have unique ids, valid contacts and https sources", () => {
  const ids = new Set();
  for (const s of SCAMS) {
    assert.match(s.id, /^[a-z0-9-]+$/);
    assert.ok(!ids.has(s.id), `duplicate id ${s.id}`);
    ids.add(s.id);
    for (const c of s.contacts) assert.ok(CONTACTS[c], `${s.id}: unknown contact ${c}`);
    assert.ok(s.sources.length > 0, `${s.id}: no sources`);
    for (const u of s.sources) assert.ok(u.startsWith("https://"), `${s.id}: ${u}`);
    for (const l of s.extraLinks || []) assert.ok(l.url.startsWith("https://"));
  }
});

test("self-check flow: all links resolve, every node reachable, no dead ends", () => {
  assert.ok(FLOW.start, "missing start node");
  const seen = new Set();
  const walk = (id) => {
    if (seen.has(id)) return;
    seen.add(id);
    const n = FLOW[id];
    assert.ok(n, `unknown node ${id}`);
    if (n.result) {
      assert.ok(["urgent", "warn", "ok"].includes(n.level), `${id}: bad level`);
      assert.ok(n.contacts.length > 0, `${id}: no contacts`);
      for (const c of n.contacts) assert.ok(CONTACTS[c], `${id}: unknown contact ${c}`);
      if (n.scam) assert.ok(SCAMS.some((s) => s.id === n.scam), `${id}: unknown scam ${n.scam}`);
    } else {
      assert.ok(n.options.length >= 2, `${id}: needs at least 2 options`);
      n.options.forEach((o) => walk(o.next));
    }
  };
  walk("start");
  const unreachable = Object.keys(FLOW).filter((k) => !seen.has(k));
  assert.deepEqual(unreachable, [], `unreachable nodes: ${unreachable}`);
});

test("danger paths send people to 000 first", () => {
  for (const id of ["danger", "familyKidnap"]) {
    assert.equal(FLOW[id].level, "urgent");
    assert.equal(FLOW[id].contacts[0], "emergency");
  }
});
