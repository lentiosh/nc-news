function getAllArticles(topic) {
    const url = topic ? `https://be-nc-news-c2a5.onrender.com/api/articles?topic=${topic}` : 'https://be-nc-news-c2a5.onrender.com/api/articles';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            return response.json();
        })
        .then(data => data.articles);  
}

function getArticleById(article_id) {
    return fetch(`https://be-nc-news-c2a5.onrender.com/api/articles/${article_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch article ${article_id}` );
            }
            return response.json();
        })
        .then(data => {
            if (!data.article) {
                throw new Error(`No ${article_id} article found`);
            }
            return data.article;
        })
        .catch(error => {
            console.error(`Error fetching ${article_id} article`, error);
            throw error; 
        });
}

function getAllCommentsByArticleId(article_id) {
    return fetch(`https://be-nc-news-c2a5.onrender.com/api/articles/${article_id}/comments`)
        .then(response => response.json())  
        .then(data => {
            if (!data.comments || data.comments.length === 0) {
                throw new Error(`No comments found for article ID ${article_id}`);
            }
            return data.comments;
        })
        .catch(error => {
            console.error(`Error fetching comments for article ID ${article_id}:`, error);
            return [];
        });
}

function updateArticleVotes(article_id, increment) {
    return fetch(`https://be-nc-news-c2a5.onrender.com/api/articles/${article_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inc_votes: increment })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update article votes');
        }
        return response.json();
    });
}

function getAllUsers() {
    return fetch(`https://be-nc-news-c2a5.onrender.com/api/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(data => {
            return data.users;
        });
}

function addCommentToArticle(articleId, username, body) {
    return fetch(`https://be-nc-news-c2a5.onrender.com/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, body }) 
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(new Error(err.msg)));
        }
        return response.json();
    });
}

function getAllTopics() {
    return fetch('https://be-nc-news-c2a5.onrender.com/api/topics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch topics');
            }
            return response.json();
        })
        .then(data => data.topics); 
}

 function getArticlesByTopic(topic) {
    const url = topic ? `https://be-nc-news-c2a5.onrender.com/api/articles?topic=${topic}` : 'https://be-nc-news-c2a5.onrender.com/api/articles';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            return response.json();
        })
        .then(data => data.articles); 
}

export { getAllArticles, getArticleById, getAllCommentsByArticleId, updateArticleVotes, getAllUsers, addCommentToArticle, getAllTopics, getArticlesByTopic };