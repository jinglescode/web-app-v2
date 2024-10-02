import { Camera } from '@capacitor/camera';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, uploadMedia } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { RootState } from 'src/store';
export const useOrganizationLogo = () => {
  const [uploadError, setUploadError] = useState('');
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  const [image, setImage] = useState({ imageUrl: state.avatar?.url, id: '' });
  const currentIdentity = useSelector<RootState, CurrentIdentity>(state => {
    const current = state.identity.entities.find(identity => identity.current);
    return current as CurrentIdentity;
  });
  const onUploadImage = async () => {
    try {
      const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
      const resp = await uploadImage(webPath);
      if (resp) {
        updateUser({ ...state, image: resp });
        setImage({ imageUrl: resp.url, id: resp.id });
      }
    } catch (e) {
      console.log('error in uploading image', e);
    }
  };

  const removeImage = async () => {
    setImage({ imageUrl: '', id: '' });
    updateUser({ ...state, avatar: null });
  };

  const updateBio = (bio: string) => {
    if (bio.length <= 160) updateUser({ ...state, bio });
  };

  async function uploadImage(url: string) {
    const blob = await fetch(url).then(resp => resp.blob());
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    if (blob.size > MAX_IMAGE_SIZE) {
      setUploadError(`Image should be less than 5MB`);
    } else {
      setUploadError('');

      const formData = new FormData();
      formData.append('file', blob);
      return uploadMedia(blob as File);
    }
  }
  const goNextPage = () => updateSelectedStep(5);
  const isValidForm = state.bio === '' || state.bio === null;
  const bio = state.bio;
  const bioCounter = state.bio ? state.bio.length : 0;
  return {
    onUploadImage,
    updateBio,
    image,
    isValidForm,
    bio,
    bioCounter,
    goNextPage,
    imageUrl: state.image?.url ? state.image?.url : null,
    uploadError,
  };
};
