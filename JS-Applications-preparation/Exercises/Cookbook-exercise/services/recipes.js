import * as request from './requester.js';

const baseUrl = 'http://localhost:3030';
const allRecipesUrl = `${baseUrl}/data/recipes`;
const recentRecipesUrl = `${baseUrl}/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3`
const guestRecipeUrl = `${baseUrl}/jsonstore/cookbook/recipes`;

export const loadRecipes = () => request.get(allRecipesUrl);

export const recentRecipes = () => request.get(recentRecipesUrl);

export const getRecipeById = (id) => request.get(`${allRecipesUrl}/${id}`);

export const createRecipe = (data) => request.post(allRecipesUrl, data);

export const editRecipe = (recipeId, data) => request.put(`${allRecipesUrl}/${recipeId}`, data);

export const deleteRecipe = (recipeId) => request.del(`${allRecipesUrl}/${recipeId}`);