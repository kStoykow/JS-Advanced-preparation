const expect = require('chai').expect;
const rgbToHexColor = require('./06-rgbToHex');

describe("Working test", () => {
    it("Should return #010101 for (1, 1, 1)", () => {
        expect(rgbToHexColor(1, 1, 1)).to.equal("#010101");
    });
    it("Should return #AAB4BE for (170, 180, 190)", () => {
        expect(rgbToHexColor(170, 180, 190)).to.equal("#AAB4BE");
    });
});

describe("Padding trailing zeroes", () => {
    it("Should pad trailing zeroes, #100101 for (16, 1, 1)", () => {
        expect(rgbToHexColor(16, 1, 1)).to.equal("#100101");
    });
});

describe("Test lowest possible input: zeros", () => {
    it("tests with zeros", () => {
        expect(rgbToHexColor(0, 0, 0)).to.equal("#000000");
    });
});

describe("Test highest possible input: 255", () => {
    it("Tests with 255", () => {
        expect(rgbToHexColor(255, 255, 255)).to.equal("#FFFFFF");
    });
});

describe('Check type of args', () => {
    it('Should return undefined if some of the args is undefined', () => {
        expect(rgbToHexColor(undefined, 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is string', () => {
        expect(rgbToHexColor('1', 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is array', () => {
        expect(rgbToHexColor([], 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is object', () => {
        expect(rgbToHexColor({}, 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is function', () => {
        expect(rgbToHexColor(function () { }, 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is boolean', () => {
        expect(rgbToHexColor(true, 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if some of the args is null', () => {
        expect(rgbToHexColor(null, 1, 1)).to.equal(undefined);
    });
    it('Should return undefined if no args', () => {
        expect(rgbToHexColor()).to.equal(undefined);
    });
});

describe('Check if args is integer', () => {
    it('Should return undefined if some of the args is not integer', () => {
        expect(rgbToHexColor(0.1, 1, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, 0.1, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, 1, 0.1)).to.equal(undefined);
    });
});

describe('Check args range', () => {
    it('Should return undefined if some of the args is not in range', () => {
        expect(rgbToHexColor(-1, 1, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, -1, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, 1, -1)).to.equal(undefined);
        expect(rgbToHexColor(256, 1, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, 256, 1)).to.equal(undefined);
        expect(rgbToHexColor(1, 1, 256)).to.equal(undefined);
    });
});