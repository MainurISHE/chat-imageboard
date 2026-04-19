import { useState } from 'react';
import { axiosApi } from '../../axiosApi';
import type { IMessage } from '../../types';
import styles from './styles.module.css';

export const ChatForm = () => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !message.trim()) return;

    const newMessage: IMessage = {
      author,
      message,
    };

    try {
      await axiosApi.post('/messages.json', newMessage);
      setAuthor('');
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={sendMessage}>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};