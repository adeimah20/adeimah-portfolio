import { useState } from 'react';
import { contactService } from '../services/contact.service';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (formData) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);
      const result = await contactService.createMessage(formData);
      if (result.success) {
        setSuccess(true);
        return { success: true, data: result.data };
      } else {
        setError(result.message || 'Failed to send message.');
        return { success: false, error: result.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to send message.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const resetStates = () => {
    setSuccess(false);
    setError(null);
  };

  return { sendMessage, loading, success, error, resetStates };
};
