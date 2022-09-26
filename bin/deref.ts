import $RefParser from "@apidevtools/json-schema-ref-parser";
$RefParser.dereference("src/schemas/game.json")
.then((schema) => {
    console.log(JSON.stringify(schema));
});

