'use client';

import React, { useState, useMemo } from 'react';
import { blogData, categories } from '@/lib/blogData';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  publishedDate: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Filter posts based on category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return blogData;
    }
    return blogData.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Healthcare Insights & News
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Stay informed with the latest healthcare trends, technology updates,
            and industry insights from our experts
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-foreground mb-6 text-2xl font-bold">
              Featured Article
            </h3>
            <div
              className="bg-card group cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
              onClick={() => openPost(filteredPosts[0])}
            >
              <div className="md:flex">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <div className="from-primary/20 to-primary/5 flex h-full w-full items-center justify-center bg-gradient-to-br">
                    <div className="text-primary text-center">
                      <svg
                        className="mx-auto mb-2 h-16 w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      <p className="text-sm">Featured Article</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {formatDate(filteredPosts[0].publishedDate)}
                    </span>
                  </div>
                  <h4 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
                    {filteredPosts[0].title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="from-primary to-primary/60 text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold">
                        {filteredPosts[0].author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          {filteredPosts[0].author}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {filteredPosts[0].authorRole}
                        </p>
                      </div>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Posts Grid */}
        {filteredPosts.length > 1 && (
          <div>
            <h3 className="text-foreground mb-6 text-2xl font-bold">
              More Articles
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.slice(1).map((post) => (
                <div
                  key={post.id}
                  className="bg-card cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => openPost(post)}
                >
                  <div className="from-primary/10 to-primary/5 relative flex h-48 items-center justify-center bg-gradient-to-br">
                    <div className="text-primary text-center">
                      <svg
                        className="mx-auto mb-2 h-12 w-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="bg-primary text-primary-foreground absolute top-3 left-3 rounded px-2 py-1 text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-foreground mb-2 line-clamp-2 text-lg font-bold">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="from-primary to-primary/60 text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold">
                          {post.author
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="text-foreground font-medium">
                          {post.author}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={closePost}
          >
            <div
              className="bg-card max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePost}
                className="bg-background/80 hover:bg-background absolute top-4 right-4 z-10 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                <div className="from-primary/20 to-primary/5 relative flex h-64 items-center justify-center bg-gradient-to-br">
                  <div className="text-primary text-center">
                    <svg
                      className="mx-auto mb-2 h-20 w-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <div className="bg-primary text-primary-foreground absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-medium">
                    {selectedPost.category}
                  </div>
                </div>

                <div className="p-8">
                  <h1 className="text-foreground mb-4 text-3xl font-bold">
                    {selectedPost.title}
                  </h1>

                  <div className="border-border/50 mb-6 flex items-center justify-between border-b pb-6">
                    <div className="flex items-center space-x-4">
                      <div className="from-primary to-primary/60 text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br font-semibold">
                        {selectedPost.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-foreground font-medium">
                          {selectedPost.author}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {selectedPost.authorRole}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">
                        {formatDate(selectedPost.publishedDate)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {selectedPost.readTime}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                    <div className="text-foreground leading-relaxed">
                      {selectedPost.content}
                    </div>
                  </div>

                  <div className="border-border/50 mt-8 border-t pt-6">
                    <h4 className="text-foreground mb-3 text-sm font-medium">
                      Tags:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
