const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const options = { headless: false, slowMo: 500 };

describe('e2e Create Recipe tests:', function () {
    this.timeout(6000);
    let browser, page;
    const url = 'http://127.0.0.1:5500/';

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto(url);
        await page.click('text=Login');
        await page.fill('input[name=email]', 'admin@abv.bg');
        await page.fill('input[name=password]', 'admin');
        await page.click('input[type=submit]');
    });
    afterEach(async () => await page.close());
    after(async () => await browser.close());


    it('Should redirect to Catalogue page and add new recipe to Catalogue.', async () => {
        let initRecipeCount = await page.locator('.preview').count();

        await page.click('text=Create Recipe');
        await page.fill('.create-recipe-page input[name=name]', '1');
        await page.fill('.create-recipe-page input[name=img]', '1');
        await page.fill('.create-recipe-page textarea[name=ingredients]', '1');
        await page.fill('.create-recipe-page textarea[name=steps]', '1');
        await page.click('input[id=create-btn]');

        expect(await page.isVisible('.root')).to.be.true;
        expect(await page.locator('.preview').count()).to.equal(initRecipeCount + 1);
    });
});