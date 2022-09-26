import $RefParser from "@apidevtools/json-schema-ref-parser";
$RefParser.bundle("src/schemas/game.json")
.then((schema) => {
    console.log(JSON.stringify(schema));
});

