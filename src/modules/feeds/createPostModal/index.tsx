import { CircularProgress } from '@mui/material';
import React from 'react';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import CustomEmojiPicker from 'src/modules/general/components/EmojiPicker';
import { Icon } from 'src/modules/general/components/Icon';
import { IconButton } from 'src/modules/general/components/iconButton';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import UploadBox from 'src/modules/general/components/uploadBox';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CreatePostModalProps } from './index.types';
import { useCreatePostModal } from './useCreatePostModal';

const CreatePostModal: React.FC<CreatePostModalProps> = ({ open, handleClose, onCreatePost, data }) => {
  const {
    data: {
      profileImage,
      name,
      username,
      causesList,
      causeVal,
      titleVal,
      contentVal,
      selectedFile,
      openEmojiPicker,
      focusElements,
      loading,
      errors,
    },
    operations: {
      onSelectCause,
      onTextChange,
      onUploadImage,
      onRemoveSelectedFile,
      setFocusElements,
      setOpenEmojiPicker,
      handleSubmit,
      onSubmitPost,
    },
  } = useCreatePostModal(handleClose, onCreatePost, data);

  const headerContentJSX = (
    <div className="flex items-center gap-3">
      <Avatar size="3rem" type="users" img={(profileImage as string) || ''} />
      <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
        {name}
        <span className="font-normal text-Gray-light-mode-500">{username}</span>
      </div>
    </div>
  );

  const footerContentJSX = (
    <div className="w-full flex items-center justify-between px-4 py-5 md:p-6">
      <div className="flex items-center gap-4">
        <div className={css.file}>
          <Icon name="image-03" fontSize={24} className="text-Gray-light-mode-500" cursor="pointer" />
          <input id="file" name="file" type="file" onChange={onUploadImage} />
        </div>
        {/* <div className={css.file}>
          <Icon name="video-recorder" fontSize={24} className="text-Gray-light-mode-500" cursor="pointer" />
          <input type="file" onChange={onUploadVideo} />
        </div> */}
        <Icon
          name="face-smile"
          fontSize={24}
          className="text-Gray-light-mode-500"
          cursor="pointer"
          onClick={() => setOpenEmojiPicker(true)}
        />
        {/* <Icon name="bar-chart-10" fontSize={24} className="text-Gray-light-mode-500" cursor="pointer" /> */}
      </div>
      <div className="flex items-center gap-4">
        {errors.content?.message && (
          <span className="text-Error-700 text-sm">{errors.content?.message?.toString()}</span>
        )}
        <Button color="primary" type="submit">
          {loading ? <CircularProgress size="20px" sx={{ color: 'white' }} /> : 'Post'}
        </Button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmitPost)}>
      <Modal
        open={open}
        handleClose={handleClose}
        headerDivider={false}
        title={headerContentJSX}
        footer={footerContentJSX}
        customStyle="relative"
        contentClassName="h-full"
      >
        <div className="flex flex-col gap-6 px-4 pb-5 pt-0 h-full md:p-6 md:pt-0">
          <SearchDropdown
            id="cause"
            name="cause"
            placeholder="Select a cause"
            icon="search-lg"
            options={causesList}
            hasDropdownIcon={false}
            isSearchable
            value={causeVal}
            onChange={onSelectCause}
            errors={errors['cause']?.label?.message ? [errors['cause']?.label?.message.toString()] : undefined}
          />
          <textarea
            name="title"
            value={titleVal}
            onChange={e => onTextChange('title', e.target.value)}
            className={`${css.textarea} text-xl font-semibold`}
            placeholder="Add a title"
            rows={1}
            onFocus={() => setFocusElements({ title: true, content: false })}
          />
          <textarea
            name="content"
            value={contentVal}
            onChange={e => onTextChange('content', e.target.value)}
            className={`${css.textarea} text-md`}
            placeholder="Write your post"
            rows={1}
            onFocus={() => setFocusElements({ title: false, content: true })}
          />
          {selectedFile ? (
            <div className="relative rounded-default overflow-hidden flex items-center justify-center">
              <img src={selectedFile as string} alt="selected-image" />
              <IconButton
                size="medium"
                iconName="x-close"
                iconSize={20}
                iconColor={variables.color_white}
                customStyle="absolute top-4 right-4 !rounded-full !bg-[#565856]"
                handleClick={onRemoveSelectedFile}
              />
            </div>
          ) : (
            <UploadBox onUpload={onUploadImage} errorMessage={errors.file?.message?.toString() || ''} />
          )}
        </div>
        {openEmojiPicker && (
          <CustomEmojiPicker
            open={openEmojiPicker}
            handleClose={() => setOpenEmojiPicker(false)}
            onEmojiSelect={value => {
              if (focusElements.title) {
                onTextChange('title', titleVal ? titleVal + value.native : value.native);
              } else {
                onTextChange('content', contentVal ? contentVal + value.native : value.native);
              }
              setOpenEmojiPicker(false);
            }}
            customStyle="sm:left-24 rounded-none rounded-t-lg"
          />
        )}
      </Modal>
    </form>
  );
};

export default CreatePostModal;
