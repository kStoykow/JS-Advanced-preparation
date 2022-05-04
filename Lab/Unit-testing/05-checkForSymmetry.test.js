const expect = require('chai').expect;
const { json } = require('mocha/lib/reporters');
const isSymmetric = require('./05-checkForSymmetry');

describe('Check result if array is not passed as argument', () => {
    it('Should return false with number', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric(1));
    });
});
describe('Check result if array is not passed as argument', () => {
    it('Should return false with string', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric('1'));
    });
});
describe('Check result if array is not passed as argument', () => {
    it('Should return false with object', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric({}));
    });
});
describe('Check result if array is not passed as argument', () => {
    it('Should return false with null', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric(null));
    });
});
describe('Check result if array is not passed as argument', () => {
    it('Should return false with undefined', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric(undefined));
    });
});
describe('Check result if array is not passed as argument', () => {
    it('Should return false with boolean', () => {
        let result = false;
        expect(result).to.be.equal(isSymmetric(true));
    });
});


describe('Check result if array is passed as argument', () => {
    it('Should return true with empty array', () => {
        let result = true;
        expect(result).to.be.equal(isSymmetric([]));
    });
});
describe('Check result if array is passed as argument', () => {
    it('Should return true if array is symmetrical', () => {
        let result = true;
        let arg = [1, 1];
        expect(result).to.be.equal(isSymmetric(arg));
    });
})
describe('Check result if array is passed as argument', () => {
    it('Should return false if array is Not symmetrical', () => {
        let result = false;
        let arg = [1, 2];
        expect(result).to.be.equal(isSymmetric(arg));
    });
});
describe('Check result if array is passed as argument', () => {
    it('Should return true if array is mixed and symmetrical', () => {
        let result = true;
        let arg = ['1', 1, '1'];
        expect(result).to.be.equal(isSymmetric(arg));
    });
});

//hard to find one//
//--function cant be passed trough JSON
describe('Check result if array is passed as argument', () => {
    it('Should return true if array is with Function and Null', () => {
        let result = true;
        let arg = [function () { }, null]
        expect(result).to.be.equal(isSymmetric(arg));
    });
});