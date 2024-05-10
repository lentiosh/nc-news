import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import { getAllArticles } from '../utils/api';
import Loading from './Loading';
import ArticleCard from './ArticleCard';

const ArticlesList = () => {
    const { topic } = useParams();  
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllArticles(topic).then(data => { 
            setArticles(data);
            setIsLoading(false);
        }).catch(err => {
            setError(err.message);
            setIsLoading(false);
        });
    }, [topic]);

    if (error) {
        return <div>Error loading articles: {error}</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{topic ? `Articles for ${topic}` : 'Articles List'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <ArticleCard key={article.article_id} article={article} />
                    ))
                ) : (
                    <p>No articles available{topic ? ` for ${topic}` : ''}.</p>
                )}
            </div>
        </div>
    );
}

export default ArticlesList;
