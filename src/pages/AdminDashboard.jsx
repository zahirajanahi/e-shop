import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image_url: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data);
    } catch (error) {
      toast.error('Error fetching products');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate image URL
      if (!isValidImageUrl(formData.image_url)) {
        toast.error('Please enter a valid image URL');
        return;
      }

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            image_url: formData.image_url
          })
          .eq('id', editingProduct.id);

        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([{
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            image_url: formData.image_url
          }]);

        if (error) throw error;
        toast.success('Product created successfully');
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ title: '', description: '', price: '', image_url: '' });
      fetchProducts();
    } catch (error) {
      toast.error(editingProduct ? 'Error updating product' : 'Error creating product');
      console.error('Error:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
        console.error('Error:', error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
      console.error('Error:', error);
    }
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null || 
           url.startsWith('https://images.unsplash.com') ||
           url.startsWith('https://via.placeholder.com');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({ title: '', description: '', price: '', image_url: '' });
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={product.image_url || 'https://via.placeholder.com/150?text=No+Image'}
                        alt={product.title}
                        className="h-16 w-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inline-flex items-center p-2 border border-transparent rounded-md text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {formData.image_url && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Preview:</p>
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}