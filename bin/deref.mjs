import $RefParser from "@apidevtools/json-schema-ref-parser";
const results = await $RefParser.dereference("../../../../src/schemas/game.json");
console.log(JSON.stringify(results));
