
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white border-b border-[#232529]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex  justify-between items-center py-3 md:py-4 flex-col md:flex-row">
                    <div className="mb-3 md:mb-0">
                        <Link to="/" className="text-lg font-bold text-gray-900 hover:text-gray-700">NC-NEWS</Link>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                        <Link to="/articles" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">All Articles</Link>
                        <Link to="/users" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Users</Link>
                        <Link to="/profile" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
