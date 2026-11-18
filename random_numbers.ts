function die() {
  console.log(`usage: deno random_numbers.ts N LOWER UPPER`);
  Deno.exit(1);
}

if (Deno.args.length < 3) {
  die();
}

const n = Number.parseInt(Deno.args[0]);
const l = Number.parseInt(Deno.args[1]);
const u = Number.parseInt(Deno.args[2]);

if (Number.isNaN(n) || Number.isNaN(l) || Number.isNaN(u)) {
  die();
}

for (let i = 0; i < n; i++) {
  const x = Math.floor(Math.random() * (u - l + 1)) + 1;
  console.log(x);
}
