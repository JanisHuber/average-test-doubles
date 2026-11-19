import { NumberSource } from "../../src/number_source.ts";

/**
 * FAKE: geht nicht aufs Dateisystem sondern hat die Dateien in einer Map drin.
 * Pfad ist der Key und die Zahlen sind der Value.
 */
export class FakeNumberSource implements NumberSource {
  private files: Map<string, Array<number>> = new Map();

  constructor(private path: string) {}

  // damit man im Test neue "Dateien" dazu tun kann
  public addFile(path: string, numbers: Array<number>): void {
    this.files.set(path, numbers);
  }

  public readNumbers(): Promise<Array<number>> {
    const numbers = this.files.get(this.path);
    if (numbers === undefined) {
      // gleich wie FileAccess wenn es die Datei nicht gibt
      return Promise.reject(new Error(`no such file: ${this.path}`));
    }
    return Promise.resolve([...numbers]);
  }
}
