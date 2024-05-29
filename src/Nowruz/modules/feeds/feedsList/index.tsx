import React from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';

import { FeedsListProps } from './index.types';
import FeedItem from '../feedItem';

const FeedsList: React.FC<FeedsListProps> = ({
  list,
  showSeeMore,
  onShowMoreFeeds,
  updateFeedsListLiked,
  updateFeedsListRepost,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {list.map(item => (
        <FeedItem
          key={item.id}
          postId={item.id}
          userIdentity={item.identity_meta}
          date={new Date(item.created_at).toString()}
          cause={item.causes_tags?.length ? SOCIAL_CAUSES[item.causes_tags[0]].label : null}
          content={item.content}
          media={item.media ? item.media[0].url : ''}
          likesCount={item.likes}
          commentsCount={item.comments}
          liked={item.liked}
          likedIdentities={item.liked_identities}
          title={item.title}
          updateFeedsListLiked={() => updateFeedsListLiked(item.id)}
          updateFeedsListRepost={updateFeedsListRepost}
          sharedPost={
            item?.shared_post
              ? {
                  userIdentity: item?.shared_from_identity ? item.shared_from_identity : null,
                  date: new Date(item.shared_post?.created_at || '').toString(),
                  cause: item.shared_post?.causes_tags?.length
                    ? SOCIAL_CAUSES[item.shared_post?.causes_tags[0]].label
                    : null,
                  content: item.shared_post?.content || '',
                  media: item.media ? item.media[0].url : '',
                  title: item.shared_post?.title || '',
                }
              : null
          }
        />
      ))}
      {showSeeMore && (
        <span className="see-more text-center" onClick={onShowMoreFeeds}>
          See more
        </span>
      )}
    </div>
  );
};

export default FeedsList;
