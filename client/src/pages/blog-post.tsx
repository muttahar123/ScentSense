import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowLeft, Share2, Heart } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const response = await fetch("/api/blog?published=true");
      const posts = await response.json();
      // Filter out current post and return 3 random posts
      return posts
        .filter((p: BlogPost) => p.slug !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    },
    enabled: !!post,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-cream">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full h-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-cream">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" data-testid="button-back-to-blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Hero Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-4 bg-luxury-gold">
                  {post.category}
                </Badge>
                <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-4" data-testid="text-blog-post-title">
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Article Meta */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span data-testid="text-blog-post-date">
                    {new Date(post.createdAt!).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <Button variant="ghost" size="sm" data-testid="button-share-post">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" data-testid="button-like-post">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Article Excerpt */}
              <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium" data-testid="text-blog-post-excerpt">
                {post.excerpt}
              </div>

              <Separator className="mb-8" />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed space-y-6"
                  data-testid="text-blog-post-content"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.split('\n').map(paragraph => 
                      paragraph.trim() ? `<p class="mb-6">${paragraph}</p>` : ''
                    ).join('')
                  }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-gray-600">Fragrance Expert & Writer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <motion.section
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-playfair text-3xl font-bold mb-8 text-center text-elegant-dark">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        <div className="p-6">
                          <Badge variant="outline" className="mb-3 text-luxury-gold border-luxury-gold">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-playfair text-lg font-semibold mb-2 text-elegant-dark group-hover:text-luxury-gold transition-colors" data-testid={`text-related-blog-title-${relatedPost.id}`}>
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2" data-testid={`text-related-blog-excerpt-${relatedPost.id}`}>
                            {relatedPost.excerpt}
                          </p>
                          <div className="mt-4 text-xs text-gray-500">
                            {new Date(relatedPost.createdAt!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  );
}
