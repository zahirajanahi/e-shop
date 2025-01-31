import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { Images } from '../constant';

const ContactForm = ({ cartItems, onClose }) => {
  const form = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    
    try {
      // Format cart items for email with images
      const itemsList = cartItems
        .map(item => {
          const imagePath = Images[item.img];
          return ` Product: ${item.name}
                   Quantity: ${item.quantity}
                   Price: $${(item.price * item.quantity).toFixed(2)}
                   Image: ${imagePath} `;
        });
      
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      // Create template parameters
      const templateParams = {
        user_name: form.current.user_name.value,
        user_email: form.current.user_email.value,
        message: form.current.message.value,
        cart_items: itemsList,
        total_amount: total.toFixed(2),
        order_details: `Order Details:\\n${itemsList}\\n\\nTotal: $${total.toFixed(2)}`
      };

      await emailjs.send(
        'service_285k4k7', // Replace with your EmailJS service ID
        'template_htabt4j', // Replace with your EmailJS template ID
        templateParams,
        'FyhT020zdNVAzrJ4D' // Replace with your EmailJS public key
      );

      toast.success('Message sent successfully!');
      onClose();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;