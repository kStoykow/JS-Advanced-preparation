const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const options = { headless: false, slowMo: 500 };

describe('e2e Catalogue tests:', function () {
    this.timeout(6000);
    let browser, page;
    const url = 'http://127.0.0.1:5500/';

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Should expand details on click.', async function () {
        await page.goto(url);
        await page.click('.preview');
        expect(await page.textContent('.ingredients h3')).to.equal('Ingredients:')
        expect(JSON.stringify(await page.locator('.ingredients ul').allTextContents())).to.equal(JSON.stringify(['1 tbsp Ingredient 12 cups Ingredient 2500 g  Ingredient 325 g Ingredient 4']));
        expect(await page.textContent('.description h3')).to.equal('Preparation:');
        expect(JSON.stringify(await page.locator('.description p').allTextContents())).to.equal(JSON.stringify(['Prepare ingredients', 'Mix ingredients', 'Cook until done']));
    });
});