import React, { useState } from 'react';
import { User } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  date: string;
  content: string;
  avatar?: string;
}

export interface CommentSectionProps {
  postId: number;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !name.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to save comment
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now(),
        user: name,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        content: newComment,
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      {/* Existing Comments */}
      <div className="space-y-6 mb-8">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                {comment.avatar ? (
                  <img 
                    src={comment.avatar} 
                    alt={comment.user} 
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/src/assets/default-avatar.jpg';
                      target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-[#0F172A]">{comment.user}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">Be the first to comment on this post!</p>
          </div>
        )}
      </div>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-[#0F172A] mb-4">Leave a Comment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (will not be published) *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment *
          </label>
          <textarea
            id="comment"
            rows={5}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#F59E0B] hover:bg-[#E8A317] text-white px-4 py-2 rounded-md font-medium transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection; 