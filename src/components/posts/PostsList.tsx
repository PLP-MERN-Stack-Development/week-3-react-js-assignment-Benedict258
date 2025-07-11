import React, { useState, useMemo } from 'react';
import { Search, Loader, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useApi } from '../../hooks/useApi';
import { Post } from '../../types';

export const PostsList: React.FC = () => {
  const { data: posts, loading, error } = useApi<Post[]>('https://jsonplaceholder.typicode.com/posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600 dark:text-gray-400">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Failed to load posts
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Blog Posts</h1>
        <p className="text-gray-600 dark:text-gray-400">Explore posts from JSONPlaceholder API</p>
      </div>

      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search posts by title or content..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </Card>

      {filteredPosts.length === 0 ? (
        <Card className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search term
          </p>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {currentPosts.map((post) => (
              <Card key={post.id} hover>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                      {post.title}
                    </h2>
                    <span className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full ml-3">
                      #{post.id}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.body}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>Author ID: {post.userId}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Card>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1} to {Math.min(startIndex + postsPerPage, filteredPosts.length)} of{' '}
                  {filteredPosts.length} posts
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    icon={ChevronLeft}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => goToPage(pageNumber)}
                          className="w-10"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    icon={ChevronRight}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};