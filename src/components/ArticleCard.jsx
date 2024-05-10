import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    console.log(article.article_id);
    return (
        <Link to={`/articles/${article.article_id}`} className="block no-underline">
            <div className="bg-white shadow-md rounded-lg p-4 mb-6 hover:bg-gray-100">
                <img src={article.article_img_url } alt={article.title} className="rounded-t-lg w-full object-cover h-48" />
                <div className="p-4">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <p className="text-gray-600">By {article.author}</p>
                    <p className="text-gray-500 text-sm">Published on {new Date(article.created_at).toLocaleDateString()}</p>
                    <p className="text-[#0cbe88] text-lg font-semibold">Topic: {article.topic}</p>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;