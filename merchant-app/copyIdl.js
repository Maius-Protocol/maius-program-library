const fs = require("fs");
const idl = require("../target/idl/maius_program_library.json");

fs.writeFileSync("config/idl.json", JSON.stringify(idl));
fs.copyFileSync(
  "../target/types/maius_program_library.ts",
  "config/maius_program_library.ts"
);
