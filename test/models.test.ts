import test from "ava";
import * as jsonfile from "jsonfile";
import { PelisCollection, Peli } from "../src/models";

const TMP = "./test/tmp.json";

// Antes de cada test dejamos el JSON temporal vacío
test.beforeEach(async () => {
  await jsonfile.writeFile(TMP, []);
});

test("getAll devuelve array vacío al arrancar", async t => {
  const col = new PelisCollection(TMP);
  const all = await col.getAll();
  t.deepEqual(all, []);
});

test("add() agrega una peli y getAll la devuelve", async t => {
  const col = new PelisCollection(TMP);
  const peli: Peli = { id: 42, title: "Test", tags: ["x"] };
  t.true(await col.add(peli));
  const all = await col.getAll();
  t.deepEqual(all, [peli]);
});

test("getById devuelve la peli correcta", async t => {
  const col = new PelisCollection(TMP);
  const peli: Peli = { id: 7, title: "Siete", tags: [] };
  await col.add(peli);
  const found = await col.getById(7);
  t.deepEqual(found, peli);
});
