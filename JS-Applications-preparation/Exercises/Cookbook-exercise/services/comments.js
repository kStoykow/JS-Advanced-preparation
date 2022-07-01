import * as request from './requester.js';

const baseUrl = 'http://localhost:3030';

const endpoints = {
    allComments: (recipeId) => `${baseUrl}/data/comments?where=recipeId%3D%22${recipeId}%22`,
    createComment: `${baseUrl}/data/comments`,
}

export const getAllComments = (recipeId) => request.get(endpoints.allComments(recipeId) + '&load=' + encodeURIComponent('author=_ownerId:users'));

export const createComment = (recipeId, content) => request.post(endpoints.createComment, { recipeId, content });