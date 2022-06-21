import * as request from './requester.js';

const baseUrl = 'http://localhost:3030';
const allRecipes = `${baseUrl}/data/recipes`;
const guestRecipeUrl = `${baseUrl}/jsonstore/cookbook/recipes`;

export const loadRecipes = () => request.get(allRecipes)//.then(res => Object.values(res));

export const getRecipeById = (id) => request.get(`${allRecipes}/${id}`);

export const createRecipe = (data) => request.post(allRecipes, data);

export const editRecipe = (id, data) => request.put(`${allRecipes}/${id}`, data);