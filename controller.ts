import { PelisCollection } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

export class PelisController {
  private collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options?: Options) {
    if (options?.id) {
      return this.collection.getById(options.id);
    } else if (options?.search) {
      return this.collection.search(options.search);
    } else {
      return this.collection.getAll();
    }
  }

  async add(peli: Peli) {
    return this.collection.add(peli);
  }
}
