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
        await page.click('text=Create Recipe');
    });
    afterEach(async () => await page.close());
    after(async () => await browser.close());


    it('Should logout and render home page', async () => {
        await page.click('text=Logout');
        expect(await page.isVisible('.msg')).to.be.true;

        const homePage = await page.locator('.root');
        await homePage.waitFor({ state: 'visible', timeout: 2000 });
        const isHome = await page.isVisible('.root');
        expect(isHome).to.be.true;

        expect(await page.isVisible('#guest')).to.be.true;
        expect(await page.isVisible('#user')).to.be.false;
    });
});