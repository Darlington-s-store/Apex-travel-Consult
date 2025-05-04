import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface BlogPostForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: FileList;
}

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BlogPostForm>();
  const [content, setContent] = React.useState('');

  const onSubmit = async (data: BlogPostForm) => {
    try {
      // Here we would normally upload the image and save the post
      console.log('Form data:', data);
      toast.success('Blog post created successfully!');
      navigate('/admin/posts');
    } catch (error) {
      toast.error('Failed to create blog post');
    }
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
    setValue('content', value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Create New Blog Post
        </motion.h1>
        
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/admin/posts')}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X size={20} className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex items-center px-4 py-2 bg-[#F59E0B] text-white rounded-lg hover:bg-[#E8A317] transition-colors"
          >
            <Save size={20} className="mr-2" />
            Save Post
          </button>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              {...register('excerpt', { required: 'Excerpt is required' })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              placeholder="Enter post excerpt"
            />
            {errors.excerpt && (
              <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            >
              <option value="">Select a category</option>
              <option value="study-abroad">Study Abroad</option>
              <option value="visa-services">Visa Services</option>
              <option value="recruitment">Recruitment</option>
              <option value="english-proficiency">English Proficiency</option>
              <option value="travel-tips">Travel Tips</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <Image size={20} className="mr-2 text-gray-500" />
                <span className="text-gray-700">Choose Image</span>
                <input
                  type="file"
                  {...register('featuredImage')}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {watch('featuredImage')?.[0] && (
                <span className="text-sm text-gray-600">
                  {watch('featuredImage')[0].name}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={handleEditorChange}
              className="h-64 mb-12"
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  [{ align: [] }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateBlogPost;