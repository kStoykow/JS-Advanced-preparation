const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page;
const options = { slowMo: 500, headless: false };


const mock = {
    titles: ['Scalable Vector Graphics', 'Open standard', 'Unix', 'ALGOL'],
    details: [
        'Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.',
        'An open standard is a standard that is publicly available and has various rights to use associated with it and may also have various properties of how it was designed (e.g. open process). There is no single definition, and interpretations vary with usage.',
        'Unix (trademarked as UNIX) is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, development starting in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others.',
        'ALGOL (short for "Algorithmic Language") is a family of imperative computer programming languages originally developed in 1958. ALGOL heavily influenced many other languages and was the standard method for algorithm description used by the Association for Computing Machinery (ACM) in textbooks and academic sources until object-oriented languages came around, for more than thirty years.',
    ]
}

describe('Accordion E2E tests', function () {
    this.timeout(6000);

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('Tests if all articles are loaded', async () => {
        await page.goto('http://127.0.0.1:5500/01.Accordion/index.html');

        const titles = await page.locator('.accordion span');
        const articleTitles = await titles.allTextContents();

        expect(articleTitles).to.deep.equal(mock.titles);
    });

    it('Tests the button. It should show the right details and change it\'s text content to "Less"', async () => {
        await page.goto('http://127.0.0.1:5500/01.Accordion/index.html');
        const btns = await page.locator('.accordion button');
        const count = await btns.count();

        for (let i = 0; i < count; i++) {
            await btns.nth(i).click();
            const currExtra = await page.locator('.accordion').nth(i).locator('.extra');
            expect(await currExtra.isVisible()).to.be.true;

            const currBtn = await page.locator('.accordion').nth(i).locator('text=Less');
            expect(await currBtn.isVisible()).to.be.true;

            const currDetails = await page.locator('.accordion').nth(i).locator('.extra');
            expect(await currDetails.textContent()).to.equal(mock.details[i]);
        }
    });

    it('Tests if button is toggleable (should hide details and is\'s text contnet to "More")', async () => {
        await page.goto('http://127.0.0.1:5500/01.Accordion/index.html');
        await page.click('text=More');
        await page.click('text=Less');
        expect(await page.isVisible('.extra')).to.be.false;
        expect(await page.isVisible('text=Less')).to.be.false;
    });
});