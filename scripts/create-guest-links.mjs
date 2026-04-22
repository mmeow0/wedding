import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";

const [, , csvPath, baseUrl = "https://example.com/"] = process.argv;

if (!csvPath) {
  console.error("Usage: npm run links -- guests.csv https://your-site.ru/");
  process.exit(1);
}

const names = readFileSync(csvPath, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const rows = names.map((name) => {
  const url = new URL(baseUrl);
  const token = randomBytes(8).toString("hex");
  url.searchParams.set("guest", token);

  return {
    token,
    name,
    url: url.toString()
  };
});

console.table(rows);
console.log("\nPaste this into src/data.ts guests:\n");
console.log(
  rows
    .map(({ token, name }) => `  { token: "${token}", name: "${name}" }`)
    .join(",\n")
);

console.log("\nOr insert into Supabase wedding_guests:\n");
console.log(
  rows
    .map(
      ({ token, name }) =>
        `insert into public.wedding_guests (token, name) values ('${escapeSql(token)}', '${escapeSql(name)}') on conflict (token) do update set name = excluded.name;`
    )
    .join("\n")
);

function escapeSql(value) {
  return value.replaceAll("'", "''");
}
