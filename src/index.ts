export type { FullThrustGame } from "./schemas/game.js";

import Ajv from "ajv";
import type { FullThrustGame } from "./index.js";
import schema from "./schemas/bundled.json";
const ajv = new Ajv.default({allErrors: true});
const ajvValidate = ajv.compile<FullThrustGame>(schema);

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
