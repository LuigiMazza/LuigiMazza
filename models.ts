import * as jsonfile from "jsonfile";

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

export class PelisCollection {
  private fileLocation = "./pelis.json";

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile(this.fileLocation, data);
      return true;
    }
  }

  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.fileLocation);
  }

  async getById(id: number): Promise<Peli | undefined> {
    const data = await this.getAll();
    return data.find((peli) => peli.id === id);
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const data = await this.getAll();
    return data.filter((peli) => {
      const titleMatch = options.title ? peli.title.includes(options.title) : true;
      const tagMatch = options.tag ? peli.tags.includes(options.tag) : true;
      return titleMatch && tagMatch;
    });
  }
}
