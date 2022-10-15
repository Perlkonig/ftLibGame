import { expect } from "chai";
import "mocha";

import type { FullThrustGame } from "../src/schemas/game.js";
import { validate } from "../src/index.js";

describe("Root exports: Validate", () => {
    it ("All good", () => {
        const results = validate(JSON.stringify({} as FullThrustGame));
        expect(results.valid).to.be.true;
        expect(results.ajvErrors).to.be.undefined;
    });
});
