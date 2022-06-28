const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const mockData = require('./mock-data.json');

const host = 'http://localhost:3000';
const endpoints = {
    recipes: '/data/recipes?select=_id%2Cname%2Cimg',
    count: '/data/recipes?count',
    recent: '/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc',
    recipe_by_id: '/data/recipes/3987279d-0ad4-4afb-8ca9-5b256ae3b298',
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    create: '/data/recipes'
};

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

const options = { headless: false, slowMo: 1000 };
let browser, context, page;

describe('E2E Cookbook tests', function () {
    this.timeout(6000);

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => {
        context = await browser.newContext();
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route('**' + endpoints.count, route => route.fulfill(json(3)));
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        context.close()
    });

    after(async () => await browser.close());



    describe('Catalog', () => {
        it('Loads and renders content from API', async () => { 
            page.route('**'+endpoints.recipes) //TOFINISH
        })
    })
})