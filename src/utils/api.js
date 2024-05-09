function getAllArticles() {
    return fetch("https://be-nc-news-c2a5.onrender.com/api/articles")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            return response.json();
        })
        .then(data => {
            if (!data.articles) {
                throw new Error('No articles found in the response');
            }
            return data.articles;
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            return [];
        });
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

export { getAllArticles, getArticleById, getAllCommentsByArticleId, updateArticleVotes };