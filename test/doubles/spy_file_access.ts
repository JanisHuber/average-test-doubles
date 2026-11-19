import { NumberSource } from "../../src/number_source.ts";
import { FileAccess } from "../../src/file_access.ts";

/**
 * SPY: Wrapper um den echten FileAccess. Gibt den Aufruf einfach weiter und
 * merkt sich nur wie oft und was zurück kam. Darum brauchts hier eine
 * richtige Datei.
 */
export class SpyFileAccess implements NumberSource {
  public callCount: number = 0;
  public returnedValues: Array<Array<number>> = [];

  constructor(private fileAccess: FileAccess) {}

  public async readNumbers(): Promise<Array<number>> {
    this.callCount++;
    const numbers = await this.fileAccess.readNumbers();
    this.returnedValues.push(numbers);
    return numbers;
  }
}
