import { html } from '../node_modules/lit-html/lit-html.js';

import * as request from './requester.js';
import { logout } from './userCRUD.js';

const baseUrl = 'http://localhost:3030';
const allRecipes = `${baseUrl}/data/recipes`;
const guestRecipeUrl = `${baseUrl}/jsonstore/cookbook/recipes`;

export const loadRecipes = () => request.get(allRecipes)//.then(res => Object.values(res));


