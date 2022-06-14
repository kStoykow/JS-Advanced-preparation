const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const opitons = { headless: false, slowMo: 500 };

describe('e2e Register tests.', function () {
    this.timeout(10000);
    let browser, page;
    const url = 'http://127.0.0.1:5500/';

    before(async () => browser = await chromium.launch(opitons));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Should render login page if successful registration.', async function () {
        await page.goto(url);
        await page.click('text=Register');
        await page.fill('.register-page input[name=email]', '1');
        await page.fill('.register-page input[name=password]', '1');
        await page.fill('.register-page input[name=rePass]', '1');
        await page.click('.register-page input[type=submit]');

        expect(await page.isVisible('.msg')).to.be.true;

        await page.locator('.login-page').waitFor({ state: 'visible', timeout: 2000 });
        await page.locator('.register-page').waitFor({ state: 'hidden', timeout: 2000 });

        expect(await page.isVisible('.login-page')).to.be.true;
        expect(await page.isVisible('.register-page')).to.be.false;
    });

    it('Should render register page if unsuccessful registration.', async function () {
        await page.goto(url);
        await page.click('text=Register');
        await page.fill('.register-page input[name=email]', '1');
        await page.fill('.register-page input[name=password]', '1');
        await page.fill('.register-page input[name=rePass]', '1');
        await page.click('.register-page input[type=submit]');

        expect(await page.isVisible('.msg')).to.be.true;

        await page.locator('.login-page').waitFor({ state: 'hidden', timeout: 2000 });
        await page.locator('.register-page').waitFor({ state: 'visible', timeout: 2000 });

        expect(await page.isVisible('.login-page')).to.be.false;
        expect(await page.isVisible('.register-page')).to.be.true;
    });
});