import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-[#222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center py-6">
                    <div className="text-center md:text-left">
                        <Link to="/" className="text-3xl font-bold text-[#0dbe98] hover:text-[#0cbe88]">
                            NC-NEWS
                        </Link>
                    </div>
                    <nav className="mt-4 md:mt-0 md:flex space-x-0 md:space-x-10">
                        <Link to="/articles" className="block text-base font-medium text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            All Articles
                        </Link>
                        <Link to="/users" className="block text-base font-medium text-white hover:text-gray-300 px-3 py-2 rounded-md">
                            Users
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
