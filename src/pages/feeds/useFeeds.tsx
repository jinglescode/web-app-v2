import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, Identity, Post, posts, SocialCauses } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { EditedData } from 'src/modules/feeds/createPostModal/index.types';
import { RootState } from 'src/store';

import { Resolver } from './index.types';

export const UseFeeds = () => {
  const postsResponse = useLoaderData() as Resolver;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { profileImage } = getIdentityMeta(currentIdentity);
  const { page, total_count } = postsResponse || {};
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(postsResponse.items || []);
  const [currentPage, setCurrentPage] = useState(page);
  const [showSnackbar, setShowSnackbar] = useState<{ create: boolean; edit: boolean }>({ create: false, edit: false });
  const showSeeMore = currentPosts.length < total_count;

  const handleOpenCreateModal = () => {
    setShowSnackbar({ create: false, edit: false });
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const onCreatePost = async () => {
    try {
      const { items } = (await posts({ page })) || [];
      if (items.length) {
        setCurrentPosts(items);
        setShowSnackbar({ create: true, edit: false });
      }
    } catch (error) {
      console.log('error in fetching posts', error);
    }
  };

  const onShowMoreFeeds = async () => {
    try {
      const { items } = (await posts({ page: currentPage + 1 })) || [];
      if (items.length) {
        setCurrentPage(prev => prev + 1);
        setCurrentPosts(list => [...list, ...items]);
      }
    } catch (error) {
      console.log('error in fetching more posts', error);
    }
  };

  const updateFeedsListLiked = (id: string) => {
    const clone = [...currentPosts];
    const mappedClone = clone.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked_identities: (item.liked
            ? item.liked_identities?.filter(identity => identity.id !== currentIdentity?.id)
            : [currentIdentity, ...(item?.liked_identities || [])]) as Identity[],
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
        };
      } else {
        return item;
      }
    });
    setCurrentPosts(mappedClone);
  };

  const updateFeedsListRepost = (response: Post) => {
    const current = [response, ...currentPosts];
    setCurrentPosts(current);
  };

  const updateFeedsListEdit = (data: EditedData) => {
    const { cause, title = '', content, file } = data;
    const clone = [...currentPosts];
    const mappedClone = clone.map(item => {
      if (item.id === data.postId) {
        return {
          ...item,
          causes_tags: cause ? ([cause.value] as SocialCauses[]) : null,
          title,
          content,
          media: file ? [file] : null,
        } as Post;
      } else {
        return item;
      }
    });
    setShowSnackbar({ create: false, edit: true });
    setCurrentPosts(mappedClone);
  };

  const updateFeedsListRemove = (id: string) => {
    const clone = [...currentPosts];
    const filteredClone = clone.filter(item => item.id !== id);
    setCurrentPosts(filteredClone);
  };

  return {
    data: { profileImage, openCreateModal, posts: currentPosts, showSeeMore, showSnackbar },
    operations: {
      handleOpenCreateModal,
      handleCloseCreateModal,
      onCreatePost,
      onShowMoreFeeds,
      updateFeedsListLiked,
      updateFeedsListRepost,
      updateFeedsListEdit,
      updateFeedsListRemove,
      setShowSnackbar,
    },
  };
};
