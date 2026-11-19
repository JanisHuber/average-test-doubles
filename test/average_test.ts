import { assertEquals } from "@std/assert";
import { Average } from "../src/average.ts";
import { FileAccess } from "../src/file_access.ts";
import { FakeNumberSource } from "./doubles/fake_number_source.ts";
import { ConfigurableStub, HardcodedStub } from "./doubles/stubs.ts";
import { MockNumberSource } from "./doubles/mock_number_source.ts";
import { SpyFileAccess } from "./doubles/spy_file_access.ts";

Deno.test("Fake: Mean von 1 bis 5 ist 3", async () => {
  const fake = new FakeNumberSource("/path/to/some/other/file");
  fake.addFile("/path/to/an/empty/file", []);
  fake.addFile("/path/to/some/other/file", [1, 2, 3, 4, 5]);
  fake.addFile("C:\\test-data\\third-file.txt", [7, 34, 2]);
  const average = new Average(fake);

  assertEquals(await average.computeMeanOfFile(), 3);
});

Deno.test("Stub 1: Mean von 1 bis 5 ist 3", async () => {
  const stub = new HardcodedStub();
  const average = new Average(stub);

  assertEquals(await average.computeMeanOfFile(), 3);
});

Deno.test("Stub 2: Mean von 1 bis 5 ist 3", async () => {
  const stub = new ConfigurableStub([1, 2, 3, 4, 5]);
  const average = new Average(stub);

  assertEquals(await average.computeMeanOfFile(), 3);
});

Deno.test("Mock: wurde genau einmal aufgerufen", async () => {
  const mock = new MockNumberSource();
  const average = new Average(mock);

  assertEquals(mock.callCount, 0);

  assertEquals(await average.computeMeanOfFile(), 3);
  assertEquals(mock.callCount, 1);
});

Deno.test("Spy: zählt mit und merkt sich die Werte", async () => {
  const path = await Deno.makeTempFile({ suffix: ".txt" });
  await Deno.writeTextFile(path, "1\n2\n3\n4\n5\n");

  try {
    const spy = new SpyFileAccess(new FileAccess(path));
    const average = new Average(spy);

    assertEquals(await average.computeMeanOfFile(), 3);
    assertEquals(spy.callCount, 1);
    assertEquals(spy.returnedValues, [[1, 2, 3, 4, 5]]);
  } finally {
    await Deno.remove(path);
  }
});
