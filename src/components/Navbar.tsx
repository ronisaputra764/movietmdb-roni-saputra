import React from 'react';

interface NavbarProps {
    handleCategoryChange: (category: string) => void;
    setSearchTerm: (term: string) => void;
    activeCategory: string;
    searchTerm: string;
    handleSearch: () => void;
    mode: 'search' | 'category';
}

const categories = ['now_playing', 'popular', 'top_rated', 'upcoming'];

const Navbar: React.FC<NavbarProps> = ({
    handleCategoryChange,
    setSearchTerm,
    activeCategory,
    searchTerm,
    handleSearch,
    mode,
}) => {
    return (
        <div className="flex justify-between items-center mt-3 flex-wrap gap-4 bg-gray-800 py-2 px-6 rounded-xl">

            <img src="public/img/logo.svg" alt="logo" className='max-w-[100px]' />
            <div className="flex gap-4 justify-center my-4 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-1 rounded capitalize ${activeCategory === cat && mode === 'category'
                            ? 'bg-blue-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                    >
                        {cat.replace('_', ' ')}
                    </button>
                ))}
            </div>

            <div className="flex gap-2  justify-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies..."
                    className="px-3 py-2 rounded text-white border-gray-400 border w-64"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Navbar;
