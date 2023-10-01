import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Fab } from 'src/components/atoms/fab/fab';
import { Header } from 'src/components/atoms/header/header';
import { ContactList } from 'src/components/organisms/contact-list/contact-list';
import { HeaderStaticMobile } from 'src/components/templates/header-static-mobile/header-static-mobile';
import { IdentityReq } from 'src/core/types';
import { useContactListShared } from 'src/pages/chat/contact-list/contact-list.shared';
import { CreateChatModal } from 'src/pages/chat/contact-list/create-chat-modal';
import { RootState } from 'src/store/store';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    chats,
    onScroll,
    onSearch,
    openCreateChatModal,
    setOpenCreateChatModal,
    onCreateSearch,
    userList,
    onCreateChat,
  } = useContactListShared();
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  return (
    <>
      <HeaderStaticMobile>
        <Header
          onBack={() => navigate('/jobs')}
          border="0"
          height="auto"
          title="Chats"
          right={<Avatar size="2rem" type="users" img={identity.meta.image} />}
        />
        <ContactList
          height="calc(var(--window-height) - var(--safe-area) + 1.5rem)"
          onScroll={onScroll}
          onContactClick={(contact) => navigate(contact.id)}
          list={chats}
          onSearch={onSearch}
        />
      </HeaderStaticMobile>
      <Fab onClick={() => setOpenCreateChatModal(true)} />
      <CreateChatModal
        open={openCreateChatModal}
        onClose={() => setOpenCreateChatModal(false)}
        userList={userList}
        onSearch={onCreateSearch}
        onCreateChat={onCreateChat}
      />
    </>
  );
};
