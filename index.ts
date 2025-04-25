import minimist from "minimist";
import { PelisController } from "./controller";

(async () => {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    // npx tsx src/index.ts add --id=123 --title="Una peli" --tags=drama --tags=historia
    const id    = Number(args.id);
    const title = String(args.title);
    const tags  = Array.isArray(args.tags)
                    ? (args.tags as any[])
                    : [String(args.tags)];
    console.log(await controller.add({ id, title, tags }));
  }
  else if (args._[0] === "get") {
    // npx tsx src/index.ts get 4411
    const id = Number(args._[1]);
    console.log(await controller.getOne({ id }));
  }
  else if (args._[0] === "search") {
    // npx tsx src/index.ts search --title="a" --tag="classic"
    const opts: { title?: string; tag?: string } = {};
    if (args.title) opts.title = String(args.title);
    if (args.tag)   opts.tag   = String(args.tag);
    console.log(await controller.get({ search: opts }));
  }
  else {
    // npx tsx src/index.ts   → lista todas
    console.log(await controller.get());
  }
})();
