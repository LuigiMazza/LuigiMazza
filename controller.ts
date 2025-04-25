import { PelisCollection, Peli } from "./models"; // ← También aplica Mejora 3

export class PelisController {
  collection: PelisCollection;

  constructor() {
    this.collection = new PelisCollection();
  }

  async get(options?: { id?: number; search?: any }): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.collection.getById(options.id);
      return peli ? [peli] : [];
    }
    if (options?.search) {
      return this.collection.search(options.search);
    }
    return this.collection.getAll();
  }

  // ✅ 2. getOne: devuelve el primer resultado
  getOne(options: { id?: number; search?: any }): Promise<Peli | undefined> {
    return this.get(options).then((arr) => arr[0]);
  }
}
