import { useState } from 'react';
import { addCommentToArticle } from '../utils/api';

const CommentForm = ({ articleId, username }) => {
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        if (!body.trim()) {
            setError('Comment body cannot be empty.');
            return;
        }
        setIsSubmitting(true);
        addCommentToArticle(articleId, username, body)
            .then(() => {
                setBody('');
                setError('');
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <textarea 
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Write a comment..."
                rows="4"
                className="border p-2 rounded w-full"
                disabled={isSubmitting}
            ></textarea>
            <button type="submit" className="bg-[#0dbe98] hover:bg-[#0cbe88] text-white font-bold py-2 px-4 rounded" disabled={isSubmitting || !username}>
                Post Comment
            </button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    );
};

export default CommentForm;
