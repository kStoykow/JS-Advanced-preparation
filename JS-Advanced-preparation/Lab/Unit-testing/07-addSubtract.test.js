const expect = require('chai').expect;
const createCalculator = require('./07-addSubtract');


describe('It should return module(object)', () => {
    it('Should contain add property', () => {
        let myObj = createCalculator();
        expect(myObj).to.have.property('add');
    });
    it('Add should be function', () => {
        let myObj = createCalculator();
        expect(typeof myObj.add).to.equal('function');
    });
    it('Should contain subtract property', () => {
        let myObj = createCalculator();
        expect(myObj).to.have.property('subtract');
    });
    it('Subtract should be function', () => {
        let myObj = createCalculator();
        expect(typeof myObj.subtract).to.equal('function');
    });
    it('Should contain get property', () => {
        let myObj = createCalculator();
        expect(myObj).to.have.property('get');
    });
    it('Get should be function', () => {
        let myObj = createCalculator();
        expect(typeof myObj.get).to.equal('function');
    });
    it('Should return object', () => {
        let myObj = createCalculator();
        expect(typeof myObj).to.equal('object');
    })
});

describe('Add and Subtract properties take number or string number param and add or subtract from internal sum', () => {
    it('Add should parse string number', () => {
        let myObj = createCalculator();
        myObj.add('1');
        expect(myObj.get()).to.equal(1);
    });
    it('Subtract should parse string number', () => {
        let myObj = createCalculator();
        myObj.subtract('1');
        expect(myObj.get()).to.equal(-1);
    });
    it('Add general test', () => {
        let myObj = createCalculator();
        myObj.add(1);
        expect(myObj.get()).to.equal(1);
    });
    it('Subtract general test', () => {
        let myObj = createCalculator();
        myObj.subtract(1);
        expect(myObj.get()).to.equal(-1);
    });
    it('Params that cant be parsed should return NaN', () => {
        let myObj = createCalculator();
        myObj.add('string');
        expect(myObj.get()).to.be.NaN;
    })
});

describe('Get returns the value of internal sum', () => {
    it('Should return the value', () => {
        let myObj = createCalculator();
        myObj.add(1);
        expect(typeof myObj.get()).to.equal('number');
        expect(myObj.get()).to.equal(1);
    });
});