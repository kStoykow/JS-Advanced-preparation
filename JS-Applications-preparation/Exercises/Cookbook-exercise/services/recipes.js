import * as request from './requester.js';

const baseUrl = 'http://localhost:3030';
const allRecipes = `${baseUrl}/data/recipes`;
const guestRecipeUrl = `${baseUrl}/jsonstore/cookbook/recipes`;

export const loadRecipes = () => request.get(allRecipes);

export const getRecipeById = (id) => request.get(`${allRecipes}/${id}`);

export const createRecipe = (data) => request.post(allRecipes, data);

export const editRecipe = (recipeId, data) => request.put(`${allRecipes}/${recipeId}`, data);

export const deleteRecipe = (recipeId) => request.del(`${allRecipes}/${recipeId}`);