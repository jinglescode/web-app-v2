import React, { useState } from 'react';
import { PostMediaUploadRes, requestOrgVerification } from 'src/core/api';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { FileUploaderMultiple } from 'src/modules/general/components/fileUploaderMultiple';
import { Modal } from 'src/modules/general/components/modal';
import store from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpenSuccessModal: () => void;
}
export const UploadModal: React.FC<UploadModalProps> = ({ open, handleClose, handleOpenSuccessModal }) => {
  const [files, setFiles] = useState<PostMediaUploadRes[]>([]);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      // apply API for KYB
      await requestOrgVerification(files.map(item => item.id));
      await store.dispatch(currentIdentities());
      setLoading(false);
      handleOpenSuccessModal();
    } catch (error) {
      setLoading(false);
      console.log('error in uploading files', error);
    }
  };
  const footerJSX = (
    <div className="w-full px-4 pb-4 pt-6 md:p-6 flex flex-col gap-3">
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue} disabled={!files.length}>
        Continue
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="upload-cloud-02" />}
      title="Send your organization details"
      subTitle="Please upload your company registration document, like a certificate or equivalent."
      footer={footerJSX}
      mobileFullHeight={false}
      mobileCentered={true}
      footerDivider={false}
      customStyle="!w-[432px]"
      id="org_verify_first"
      inlineTitle={false}
    >
      <div className="px-4 py-5 md:px-6">
        <FileUploaderMultiple
          fileTypes={['PDF', 'PNG', 'JPG']}
          maxFileNumbers={10}
          maxSize={2}
          customStyle="w-full h-[126px]"
          uploaded={files}
          setUploaded={setFiles}
          loading={loading}
        />
      </div>
    </Modal>
  );
};
