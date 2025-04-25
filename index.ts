import minimist from "minimist";
import { PelisController } from "./controller";

(async () => {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const id = Number(args.id);
    const title = String(args.title);
    const tags = Array.isArray(args.tags) ? args.tags : [String(args.tags)];

    // Delegamos la lógica de "add" al Controller
    const success = await controller.add({ id, title, tags });
    console.log(success);
  }

  if (args._[0] === "list") {
    const all = await controller.getAll();
    console.log(all);
  }

  if (args._[0] === "search") {
    const term = String(args.term);
    const results = await controller.search({ term });
    console.log(results);
  }

  // ... otros comandos según necesidad ...
})();
