import { ChatForm } from '../../components/ChatFrom/ChatForm';
import { MessagesList } from '../../components/MessagesList/MessagesList';

export const Chat = () => {
  return (
    <div>
      <ChatForm />
      <MessagesList />
    </div>
  );
};