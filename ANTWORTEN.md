# Test Doubles

## Interface

Heisst `NumberSource` und ist in `src/number_source.ts`.

Es liefert ja nur eine Reihe von Zahlen und woher die kommen ist egal. Darum
nichts mit Datei im Namen.

`demo.ts` läuft danach noch gleich wie vorher. Getestet mit
`deno run --allow-read demo.ts mean data/1-to-10.txt`.

## Frage: Welcher Stub macht den Test besser lesbar?

Der zweite mit dem Konstruktor.

Beim ersten steht im Test nur `new HardcodedStub()` und dann
`assertEquals(result, 3)`. Woher die 3 kommt sieht man gar nicht, dafür müsste
man in die Stub Klasse reinschauen.

Beim zweiten steht `new ConfigurableStub([1, 2, 3, 4, 5])` direkt im Test. Da
sieht man sofort wieso 3 rauskommt. Und vom ersten bräuchte man für jede neue
Zahlenreihe nochmals einen, vom zweiten reicht einer für alles.

## Frage: Ist der zweite Stub noch ein Stub oder schon ein Fake?

Immer noch ein Stub.

Ein Fake ist eine vereinfachte Implementierung und ein Stub liefert nur
hart-kodierte Antworten ohne Logik. Der Unterschied ist also ob Logik drin ist.

Der zweite Stub hat keine Logik. Er gibt einfach das zurück was man ihm gegeben
hat. Dass man die Antwort von aussen einstellen kann macht ihn noch nicht zum
Fake.

Der Fake hat dagegen Logik. Der schaut in der Map nach ob es den Pfad
überhaupt gibt. Das ist eine vereinfachte Version von dem was FileAccess mit dem
Dateisystem macht.
