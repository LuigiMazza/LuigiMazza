import * as minimist from "minimist";
import { PelisController } from "./controller";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const newPeli = {
      id: args.id,
      title: args.title,
      tags: Array.isArray(args.tags) ? args.tags : [args.tags],
    };
    const result = await controller.add(newPeli);
    console.log(result ? "Pelicula agregada correctamente" : "No se pudo agregar la pelicula");
  } else if (args._[0] === "get") {
    const peli = await controller.get({ id: args._[1] });
    console.log(peli);
  } else if (args._[0] === "search") {
    const searchOptions = { title: args.title, tag: args.tag };
    const result = await controller.get({ search: searchOptions });
    console.log(result);
  } else {
    const allMovies = await controller.get();
    console.log(allMovies);
  }
}

main();
