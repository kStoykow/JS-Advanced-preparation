function attachEvents() {
    function DOMElementFactory(type, content, attribute) {
        const elem = document.createElement(type);
        if (typeof content == 'string') {
            if (type == 'img') {
                elem.src = content;
            } else {
                elem.textContent = content;
            }
        } else {
            if (Array.isArray(content)) {
                content.forEach(e => elem.appendChild(e));
            } else {
                elem.appendChild(content);
            }
        }
        if (attribute !== undefined) {
            attribute.forEach(([k, v]) => elem[k] = v);
        }

        return elem;
    }
    const createOption = DOMElementFactory.bind(null, 'option');
    const createLi = DOMElementFactory.bind(null, 'li');

    const select = document.getElementById('posts');
    const postInfoElem = document.getElementById('post-body');
    const postCommentsElem = document.getElementById('post-comments');

    const linkedList = {};

    function getPosts() {
        return fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log(e));
    }

    function getComments() {
        return fetch(`http://localhost:3030/jsonstore/blog/comments`)
            .then(res => res.json())
            .then(res => Object.values(res))
            .catch(e => console.log(e));
    }

    function renderPosts() {
        getPosts()
            .then(createOptions)
            .catch(e => console.log(e));
    }

    function createOptions(data) {
        document.getElementById('posts').innerHTML = '';
        data.forEach((post) => {
            linkedList[post.id] = { body: post.body, comments: [] };
            select.appendChild(createOption(`${post.title}`, [['value', `${post.id}`]]));
        });
    }

    function renderCommnets() {
        getComments()
            .then(createComments)
            .catch(e => console.log(e));
    }

    function createComments(data) {
        data.forEach(comment => {
            if (linkedList[comment.postId].comments.some(e => e.commentId == comment.id) == false) {
                linkedList[comment.postId].comments.push({ id: comment.id, text: comment.text });
            }
        });

        postInfoElem.textContent = '';
        postCommentsElem.innerHTML = '';
        const currentPost = select.value;

        postInfoElem.textContent = linkedList[currentPost].body;
        linkedList[currentPost].comments.forEach(comment => {
            postCommentsElem.appendChild(createLi(`${comment.text}`, [['id', `${comment.id}`]]));
        });
    }

    const getPostsBtn = document.getElementById('btnLoadPosts');
    const viewCommentsBtn = document.getElementById('btnViewPost');

    getPostsBtn.addEventListener('click', renderPosts);
    viewCommentsBtn.addEventListener('click', renderCommnets);
}

attachEvents();