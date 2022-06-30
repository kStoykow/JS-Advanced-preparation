import * as request from './requester.js';

const baseUrl = 'http://localhost:3030';
const PAGE_SIZE = 3;

const endpoints = {
    recipesCount: `${baseUrl}/data/recipes?count`,
    allRecipes: `${baseUrl}/data/recipes`,
    pagination: (page) => `${baseUrl}/data/recipes?select=_id%2Cname%2Cimg&offset=${(page - 1) * PAGE_SIZE}&pageSize=${PAGE_SIZE}`,
    recentRecipes: `${baseUrl}/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3`,
    allComments: (recipeId) => `${baseUrl}/data/comments?where=recipeId%3D%22${recipeId}%22`,
    createComment: `${baseUrl}/data/comments`,
}

export const totalPages = Math.ceil(await request.get(endpoints.recipesCount) / PAGE_SIZE);

export const loadRecipes = (page) => request.get(endpoints.pagination(page));

export const recentRecipes = () => request.get(endpoints.recentRecipes);

export const getRecipeById = (recipeId) => request.get(`${endpoints.allRecipes}/${recipeId}`);

export const createRecipe = (data) => request.post(endpoints.allRecipes, data);

export const editRecipe = (recipeId, data) => request.put(`${endpoints.allRecipes}/${recipeId}`, data);

export const deleteRecipe = (recipe) => {
    console.log(recipe);
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        request.del(`${endpoints.allRecipes}/${recipe._id}`)
    }

}

export const getAllComments = (recipeId) => request.get(endpoints.allComments(recipeId));

export const createComment = (data) => request.post(endpoints.createComment, data);
