"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
json_schema_ref_parser_1["default"].bundle("src/schemas/game.json")
    .then(function (schema) {
    console.log(JSON.stringify(schema));
});
