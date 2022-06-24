const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;
const options = { slowMo: 500, headless: false };


const mock = {
    titles: ['Scalable Vector Graphics', 'Open standard', 'Unix', 'ALGOL'],

}

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Tests if all articles are loaded', async () => {
        await page.goto('http://127.0.0.1:5500/01.Accordion/index.html');

        const articles = await page.locator('.accordion span');
        const articleTitles = await articles.allTextContents();

        expect(articleTitles).to.deep.equal(mock.titles);
    });
});