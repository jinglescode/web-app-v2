import { useState } from 'react';
import { Button } from 'src/modules/general/components/Button';
import { IconButton } from 'src/modules/general/components/iconButton';
import { Input } from 'src/modules/general/components/input/input';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { SendMessageProps } from './index.types';

export const SendMessage: React.FC<SendMessageProps> = ({ onSend, handleCreateChat, recipientId }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    onSend?.(newMessage);
    if (recipientId) handleCreateChat?.(recipientId, newMessage);
    setNewMessage('');
  };

  const enterInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSendMessage();
  };

  return (
    <>
      <div className={`hidden md:flex ${css['box']}`}>
        <textarea
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={enterInput}
          className={css['input']}
          placeholder="Send a message"
        />

        <Button
          variant="contained"
          color="primary"
          customStyle="absolute right-[14px] bottom-[14px]"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
      <div className="flex md:hidden py-6 gap-3">
        <div className="flex-1">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Send a message"
            onKeyDown={enterInput}
          />
        </div>
        <IconButton
          size="medium"
          iconName="send-01"
          iconSize={20}
          iconColor={variables.color_white}
          handleClick={handleSendMessage}
          customStyle="!bg-Brand-600"
        />
      </div>
    </>
  );
};
