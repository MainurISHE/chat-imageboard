import { useEffect } from 'react';
import { axiosApi } from '../../axiosApi';
import { useChatStore } from '../../chatStore';
import type { ApiMessage, IMessageFull } from '../../types';
import styles from './styles.module.css';

export const MessagesList = () => {
  const { messages, setMessages } = useChatStore();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosApi.get<ApiMessage>('/messages.json');
        const data = res.data;

        if (!data) return;

        const newMessages: IMessageFull[] = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        setMessages(newMessages);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMessages();

    const interval = setInterval(fetchMessages, 15000);
    return () => clearInterval(interval);
  }, [setMessages]);

  const addLike = async (message: IMessageFull) => {
    const nextLikes = (message.likes ?? 0) + 1;

    try {
      setMessages(
        messages.map((msg) =>
          msg.id === message.id ? { ...msg, likes: nextLikes } : msg,
        ),
      );

      await axiosApi.patch(`/messages/${message.id}.json`, {
        likes: nextLikes,
      });
    } catch (e) {
      setMessages(messages);
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      {messages.map((msg) => (
        <div key={msg.id} className={styles.messageCard}>
          <h5>Author: {msg.author}</h5>
          <p>{msg.message}</p>

          <button onClick={() => addLike(msg)}>Like</button>
          <span>{msg.likes || 0}</span>
        </div>
      ))}
    </div>
  );
};
