import minimist from "minimist";
import { PelisController } from "./controller";

async function main() {
  const args = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (args._[0] === "add") {
    const success = await controller.collection.add({
      id: Number(args.id),
      title: String(args.title),
      tags: Array.isArray(args.tags) ? args.tags : [String(args.tags)],
    });
    console.log(success);
  } else if (args._[0] === "get") {
    const id = Number(args._[1]);
    console.log(await controller.get({ id }));
  } else if (args._[0] === "search") {
    console.log(
      await controller.get({
        search: { title: args.title, tag: args.tag },
      })
    );
  } else {
    console.log(await controller.get());
  }
}

main();
