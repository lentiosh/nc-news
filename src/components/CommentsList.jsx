import { useState, useEffect } from 'react';
import { getAllCommentsByArticleId } from '../utils/api';

const CommentsList = ({ article_id }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCommentsByArticleId(article_id)
            .then(comments => {
                setComments(comments);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [article_id]);

    if (isLoading) return <div className="text-center py-4">Loading comments...</div>;
    if (error) return <div className="text-red-500 text-center py-4">Error loading comments: {error}</div>;
    if (comments.length === 0) return <div className="text-gray-500 text-center py-4">No comments yet.</div>;

    return (
        <div className="space-y-4 mt-6">
            {comments.map(comment => (
                <div key={comment.comment_id} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-gray-800">{comment.body}</p>
                    <div className="text-sm text-gray-600">
                        By {comment.author} on {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
