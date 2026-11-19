/**
 * Liefert ein Array von Zahlen.
 * Alles hängt nun an diesem INterface und wir können einen Double einsetzen.
 */
export interface NumberSource {
  readNumbers(): Promise<Array<number>>;
}
