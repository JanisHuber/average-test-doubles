import { NumberSource } from "../../src/number_source.ts";

/**
 * MOCK: wie der Stub aber zählt mit wie oft er aufgerufen wurde.
 */
export class MockNumberSource implements NumberSource {
  public callCount: number = 0;

  public readNumbers(): Promise<Array<number>> {
    this.callCount++;
    return Promise.resolve([1, 2, 3, 4, 5]);
  }
}
