import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTopics } from '../utils/api'; 

const Home = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllTopics()
            .then(fetchedTopics => {
                setTopics(fetchedTopics);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div className="text-white bg-[#222] h-screen flex justify-center items-center">Loading topics...</div>;
    if (error) return <div className="text-white bg-[#222] h-screen flex justify-center items-center">Error loading topics: {error}</div>;

    return (
        <div className="text-white bg-[#222] min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to NC-NEWS</h1>
            <h2 className="text-2xl font-semibold mb-4">Explore Articles by Topics</h2>
            <ul className="list-none p-0">
                {topics.map(topic => (
                    <li key={topic.slug} className="mb-2">
                        <Link to={`/topics/${topic.slug}`} className="text-lg text-[#0dbe98] hover:text-[#0cbe88]">
                            {topic.slug.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
