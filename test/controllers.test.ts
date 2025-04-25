import anyTest, { TestFn } from "ava";
import { PelisController } from "../controller";

// Generamos IDs únicos para los tests
const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const TEST_ID = getRandomId();

interface Context {
  controller: PelisController;
}

const test = anyTest as TestFn<Context>;

// Antes de cada test, creamos un nuevo controller
test.beforeEach(t => {
  t.context.controller = new PelisController();
});

// Test: agregar y obtener una película
test("add() and getById() should store and retrieve a movie", async t => {
  const controller = t.context.controller;
  const movie = { id: TEST_ID, title: "Test Movie", tags: ["test", "ava"] };

  const addResult = await controller.add(movie);
  t.true(addResult);

  const fetched = await controller.getById(TEST_ID);
  t.deepEqual(fetched, movie);
});

// Test: listar películas
test("getAll() should return an array of movies", async t => {
  const controller = t.context.controller;
  const all = await controller.getAll();
  t.true(Array.isArray(all));
});
