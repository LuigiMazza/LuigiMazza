// src/controller.ts

import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

export class PelisController {
  collection: PelisCollection;

  constructor() {
    // Si tu PelisCollection por defecto ya apunta a "./pelis.json",
    // puedes dejar el constructor sin parámetros.
    this.collection = new PelisCollection(/* "./pelis.json" */);
  }

  /**
   * Método genérico: devuelve
   * - todas las películas si no recibe opciones,
   * - una película si recibe { id },
   * - o un array filtrado si recibe { search }.
   */
  async get(options?: Options): Promise<Peli | Peli[] | undefined> {
    if (!options) {
      return await this.collection.getAll();
    }

    if (options.id !== undefined) {
      return await this.collection.getById(options.id);
    }

    if (options.search) {
      return await this.collection.search(options.search);
    }
  }

  /**
   * Igual que get({ id }), pero con firma clara de un solo resultado.
   */
  getOne(options: { id?: number; search?: any }): Promise<Peli | undefined> {
    return this.get(options) as Promise<Peli | undefined>;
  }

  /**
   * Agrega una película delegando a la colección.
   */
  async add(peli: Peli): Promise<boolean> {
    return this.collection.add(peli);
  }

  // ——— Métodos adicionales exigidos por los tests ———

  /**
   * Devuelve todas las películas.
   * Usado en test/controllers.test.ts
   */
  async getAll(): Promise<Peli[]> {
    return this.collection.getAll();
  }

  /**
   * Devuelve una película por ID.
   * Usado en test/controllers.test.ts
   */
  async getById(id: number): Promise<Peli | undefined> {
    return this.collection.getById(id);
  }

  /**
   * Busca por título o tag.
   * Usado desde tu CLI con controller.search(...)
   */
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    return this.collection.search(options);
  }
}


