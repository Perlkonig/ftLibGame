export type { FullThrustGame } from "./schemas/game.js";

import Ajv from "ajv";
import type { FullThrustGame } from "./index.js";
import schema from "./schemas/bundled.json";
const ajv = new Ajv.default({allErrors: true});
const ajvValidate = ajv.compile<FullThrustGame>(schema);
import stringify from "json-stringify-deterministic";
import sha256 from 'crypto-js/sha256.js';
import Hex from 'crypto-js/enc-hex.js';

export enum EvalErrorCode {
    NoObject="NOOBJECT",
    NoSystem="NOSYSTEM",
}

export enum ValErrorCode {
    BadJSON="BADJSON",
    InvalidState="INVALIDSTATE",
}

export interface IValidation {
    valid: boolean;
    code?: ValErrorCode;
    ajvErrors?: Ajv.ErrorObject[];
    evalErrors?: EvalErrorCode[];
}

export const evaluate = (game: FullThrustGame): EvalErrorCode[] => {
    const errors: EvalErrorCode[] = [];
    return errors;
}

export const validate = (shipJson: string): IValidation => {
    const results = {
        valid: true,
    } as IValidation;

    // Test against schema
    const shipObj: FullThrustGame = JSON.parse(shipJson);
    if (! ajvValidate(shipObj)) {
        results.valid = false;
        results.code = ValErrorCode.BadJSON;
        results.ajvErrors = ajvValidate.errors!;
    }

    if (results.valid) {
        // Evaluate and look for construction errors
        const evaluation = evaluate(shipObj);
        if (evaluation.length > 0) {
            results.valid = false;
            results.code = ValErrorCode.InvalidState;
            results.evalErrors = evaluation;
        }
    }

    return results;
}

export const hashTurns = (obj: FullThrustGame): string | undefined => {
    if (obj.turns === undefined) {
        return undefined;
    }
    const hash = sha256(stringify(obj.turns));
    return Hex.stringify(hash);
}

export const hashFleets = (obj: FullThrustGame): string | undefined => {
    if (obj.ships === undefined) {
        return undefined;
    }
    const sorted = [...obj.ships].sort((a, b) => a.uuid!.localeCompare(b.uuid!));
    const hash = sha256(stringify(sorted));
    return Hex.stringify(hash);
}
