import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { getArticleById, updateArticleVotes, getAllUsers } from '../utils/api';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';


const SingleArticle = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        getArticleById(article_id)
            .then(articleData => {
                setArticle(articleData);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
            getAllUsers()
            .then(usersData => {
                setUsers(usersData);
                setSelectedUser(usersData[0]?.username);
            })
            .catch(err => {
                console.error('Failed to fetch users:', err);
            });
    }, [article_id]);

    const handleVote = (increment) => {
        const newVotes = article.votes + increment;
        setArticle({ ...article, votes: newVotes }); 
        updateArticleVotes(article_id, increment).catch(err => {
            setArticle({ ...article }); 
            alert(`Failed to update votes: ${err.message}`); 
        });
    };

    if (isLoading) return <Loading />;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!article) return <div className="text-gray-500 text-center py-4">Article not found!</div>;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md mt-6">
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <img src={article.article_img_url} alt={article.title} className="w-full h-auto mb-4 rounded" />
            <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Topic:</span> {article.topic} | 
                <span className="font-medium"> By</span> {article.author} |
                <span className="font-medium"> On</span> {new Date(article.created_at).toLocaleDateString()}
            </div>
            <p className="text-gray-800 text-lg">{article.body}</p>
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => handleVote(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Vote Up
                    </button>
                    <button onClick={() => handleVote(-1)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Vote Down
                    </button>
                </div>
                <span className="text-lg font-semibold">Votes: {article.votes}</span>
            </div>
            <hr className="my-4" />
            <h2 className="text-2xl font-semibold mb-3">Comments</h2>
            <select 
                value={selectedUser} 
                onChange={e => setSelectedUser(e.target.value)} 
                className="border p-2 rounded mb-4"
            >
                {users.map(user => (
                    <option key={user.username} value={user.username}>
                        {user.name}
                    </option>
                ))}
            </select>
            <CommentForm articleId={article_id} username={selectedUser} />
            <CommentsList article_id={article_id} />
        </div>
    );
}

export default SingleArticle;
