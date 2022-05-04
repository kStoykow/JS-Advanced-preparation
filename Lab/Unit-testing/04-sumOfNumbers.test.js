const expect = require('chai').expect;
const sum = require('./04-sumOfNumbers');


describe('Testing function Sum', () => {
    it('Testing positive numbers sum 1 + 1', () => {
        let expected = 2;
        let actual = [1, 1];
        expect(expected).to.be.equal(sum(actual));
    });

    it('Testing negative numbers sum 1 + -1', () => {
        let expected = 0;
        let actual = [1, -1];
        () => expect(expected).to.be.equal(sum(actual));
    })

    it('Testing sum of zeroes 0 + 0', () => {
        () => expect(0).to.be.equal(sum([0, 0]));
    })
    it('Testing sum of empty array', () => {
        () => expect(0).to.be.equal(sum([]));
    })
})