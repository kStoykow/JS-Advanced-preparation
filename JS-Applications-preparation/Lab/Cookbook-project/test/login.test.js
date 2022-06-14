const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const options = { headless: false, slowMo: 500 };

describe('e2e Login tests:', function () {
    this.timeout(6000);
    let browser, page;
    const url = 'http://127.0.0.1:5500/';

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Login test. Should render home page on login.', async function () {
        await page.goto(url);
        await page.click('text=Login');

        await page.fill('input[name=email]', 'admin@abv.bg');
        await page.fill('input[name=password]', 'admin');
        await page.click('input[type=submit]');

        const isHome = await page.isVisible('.root');

        expect(await page.isVisible('[text=Login]')).to.be.false;
        expect(isHome).to.be.true;
    });

    it('Login test. Should render error msg when wrong email entered login.', async function () {
        await page.goto('http://127.0.0.1:5500/');
        await page.click('text=Login');
        await page.fill('input[name=email]', 'a');
        await page.fill('input[name=password]', 'admin');
        await page.click('input[type=submit]');

        const isMsg = await page.isVisible('.msg');

        expect(await page.isVisible('text=Login')).to.be.true;
        expect(isMsg).to.be.true;
    });
    it('Login test. Should render error msg when wrong password entered login.', async function () {
        await page.goto('http://127.0.0.1:5500/');
        await page.click('text=Login');
        await page.fill('input[name=email]', 'admin@abv.bg');
        await page.fill('input[name=password]', 'a');
        await page.click('input[type=submit]');

        const isMsg = await page.isVisible('.msg');

        expect(await page.isVisible('text=Login')).to.be.true;
        expect(isMsg).to.be.true;
    });
});
