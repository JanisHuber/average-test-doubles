import { NumberSource } from "../../src/number_source.ts";

/** STUB 1: gibt immer die gleichen Zahlen zurück. */
export class HardcodedStub implements NumberSource {
  public readNumbers(): Promise<Array<number>> {
    return Promise.resolve([1, 2, 3, 4, 5]);
  }
}

/** STUB 2: gleich wie oben aber die Zahlen kommen per Konstruktor rein. */
export class ConfigurableStub implements NumberSource {
  constructor(private numbers: Array<number>) {}

  public readNumbers(): Promise<Array<number>> {
    return Promise.resolve(this.numbers);
  }
}
