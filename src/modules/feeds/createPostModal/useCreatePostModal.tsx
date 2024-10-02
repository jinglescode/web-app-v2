import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { createPost, CurrentIdentity, Media, SocialCauses, updatePost, uploadMedia } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';
import * as yup from 'yup';

import { EditedData, Form, OptionType } from './index.types';

const schema = yup
  .object()
  .shape({
    cause: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string().required(),
    }),
    content: yup.string().required('Content is required'),
    file: yup
      .mixed()
      .nullable()
      .test('fileOrString', 'Invalid file or string', value => {
        return value === null || typeof value === 'string' || value instanceof File;
      }),
    title: yup.string(),
  })
  .required();

export const useCreatePostModal = (
  handleClose: () => void,
  onCreatePost: (data?: EditedData) => void,
  data?: EditedData,
) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { profileImage, name, username } = getIdentityMeta(currentIdentity);
  const causesKeys = Object.keys(SOCIAL_CAUSES);
  const causesList = causesKeys.map(causeskey => {
    return { value: SOCIAL_CAUSES[causeskey].value, label: SOCIAL_CAUSES[causeskey].label };
  });
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [focusElements, setFocusElements] = useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const titleVal = watch('title');
  const contentVal = watch('content');
  const causeVal = watch('cause');

  const initializeValues = () => {
    const initialVal: Form = {
      cause: data?.cause || { label: '', value: '' },
      content: data?.content || '',
      file: data?.file?.id || '',
      title: data?.title || '',
    };
    data?.file?.url && setSelectedFile(data.file.url);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [data]);

  const onSelectCause = option => setValue('cause', option);

  const onTextChange = (name: 'title' | 'content', value: string) => setValue(name, value);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const file = e.target.files?.[0];
    clearErrors('file');
    setSelectedFile('');
    if (!file) {
      setValue('file', null);
      return;
    }
    const fileExtension = file?.name.split('.').pop()?.toLowerCase() || '';
    if (file.size > MAX_IMAGE_SIZE) {
      setError('file', { message: 'This image too big, maximum file size is 10MB.' });
      setValue('file', null);
    } else if (!allowedExtensions.includes(fileExtension)) {
      setError('file', { message: 'Image should have jpg/jpeg/png/gif format' });
    } else {
      setValue('file', file);
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const onRemoveSelectedFile = () => {
    setValue('file', null);
    setSelectedFile('');
  };

  const onSubmitPost: SubmitHandler<Form> = async ({ cause, title, content, file }) => {
    setLoading(true);
    try {
      let mediaId = '';
      let mediaUrl = '';
      if (file instanceof File) {
        const { id, url } = (await uploadMedia(file as File)) || {};
        mediaId = id;
        mediaUrl = url;
      } else if (typeof file === 'string') {
        mediaId = file;
        mediaUrl = data?.file?.url || '';
      } else {
        mediaId = '';
      }
      if (data) {
        await updatePost(data.postId, {
          causes_tags: [(cause?.value as SocialCauses) || ''],
          title,
          content,
          media: mediaId ? [mediaId] : null,
        });
        onCreatePost({ ...data, cause, title, content, file: { id: mediaId, url: mediaUrl } as Media });
      } else {
        await createPost({
          causes_tags: [(cause?.value as SocialCauses) || ''],
          title,
          content,
          media: mediaId ? [mediaId] : null,
        });
        onCreatePost();
      }
      handleClose();
      setSelectedFile('');
      reset();
    } catch (error) {
      console.log('error in creating post', error);
    }
    setLoading(false);
  };

  return {
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
  };
};
