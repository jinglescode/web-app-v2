import { Header } from 'src/components/atoms/header-v2/header';
import css from './edit.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Category } from 'src/components/molecules/category/category';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { useEffect } from 'react';
import { Input } from 'src/components/atoms/input/input';
import { EditProps } from './edit.types';
import { useProfileOrganizationEditShared } from 'src/pages/profile-organization-edit/profile-organization-edit.shared';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { endpoint } from 'src/core/endpoints';

export const EditOrganization = (props: EditProps): JSX.Element => {
  const { onAvatarEdit, onCoverEdit, avatarImage, coverImage, updateCityList, form, cities, organization } =
    useProfileOrganizationEditShared();

  useEffect(() => {
    updateCityList(organization.country);
  }, []);

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  function onSave() {
    const payload = getFormValues(form);
    endpoint.post.organizations['orgs/update/{org_id}'](organization.id, payload).then(() => {
      props.onClose();
    });
  }

  return (
    <Modal height={props.height} width={props.width} open={props.open} onClose={props.onClose}>
      <>
        <div className={css.mainHeader}>
          <Header onBack={props.onClose} title="Edit" right={{ label: 'Save', onClick: onSave }} />
        </div>
        <div>
          <div>
            <div className={css.header}>
              <div className={css.coverImage} style={{ backgroundImage: `url(${coverImage})` }} />
              <div className={css.photoIcon} onClick={onCoverEdit}>
                <img src="/icons/photos-white.svg" />
              </div>
              <div className={css.profileImgContainer}>
                <div className={css.photoIcon} onClick={onAvatarEdit}>
                  <img src="/icons/photos-white.svg" />
                </div>
                <div className={css.profileImage} style={{ backgroundImage: `url(${avatarImage})` }} />
              </div>
            </div>
          </div>
          <div className={css.formContainer}>
            {/* <Dropdown label='Organization type' list={ORGANIZATION_TYPE} /> */}
            <Input label="Name" register={form} name="name" placeholder="name" />
            <Textarea label="bio" register={form} name="bio" placeholder="bio" />
            <Category
              register={form}
              name="social_causes"
              label="Social causes"
              list={socialCausesToCategoryAdaptor()}
              placeholder="Social causes"
            />
            <Input label="Email" register={form} name="email" placeholder="email" />
            <Dropdown
              register={form}
              label="Country"
              name="country"
              list={COUNTRIES}
              placeholder="country"
              onValueChange={onCountryUpdate}
            />
            <Dropdown
              register={form}
              label="City"
              name="city"
              list={cities}
              placeholder="city"
              onValueChange={(option) => form.controls.geoname_id.setValue(option.id)}
            />
            <Input label="Address" register={form} name="address" placeholder="address" />
            <div>
              <div className={css.label}>Phone</div>
              <div className={css.phoneContainer}>
                <Dropdown register={form} name="mobile_country_code" placeholder="+1" list={COUNTRY_CODES} />
                <Input register={form} name="phone" placeholder="phone" />
              </div>
            </div>
            <Input label="Website" register={form} name="website" placeholder="http://website.com" />
            <Textarea label="Mission" register={form} name="mission" placeholder="mission" />
            <Textarea label="Culture" register={form} name="culture" placeholder="culture" />
          </div>
        </div>
      </>
    </Modal>
  );
};