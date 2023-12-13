import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './job-create-form.module.scss';
import { useJobCreateForm } from './useJobCreateForm';
import { JobCreateHeader } from '../../components/Header';
import { JobPreviewModal } from '../../components/JobPreviewModal';
export const JobCreateForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    causesList,
    catagoriesList,
    onSelectCause,
    errors,
    searchCities,
    onSelectCity,
    openPreview,
    setOpenPreview,
    openSuccessModal,
    setOpenSuccessModal,
    onPreview,
    skills,
  } = useJobCreateForm();
  const renderInfo = (title: string, description: string) => (
    <div className={css.info}>
      <div className={css.infoTitle}>{title}</div>
      <div className={css.infoDescription}>{description}</div>
    </div>
  );
  const renderAmountFields = () => {
    return (
      <div className="flex justfy-center align-center">
        <Input id="from" name="from" register={register} placeholder="0" className={css.priceInputs} />
        <span className="mx-2">to</span>
        <Input id="from" name="from" register={register} placeholder="0" className={css.priceInputs} />
      </div>
    );
  };
  return (
    <div>
      <form>
        <JobCreateHeader onPreview={onPreview} onPublish={handleSubmit(onSubmit)} />
        <div className={css.row}>
          {renderInfo('What is your job about?', 'Select a social cause')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Search a cause"
              icon="search-lg"
              options={causesList}
              isSearchable
              onChange={(option) => onSelectCause(option.value)}
              errors={errors['cause']?.message ? [errors['cause']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job title', 'Job titles must describe one position')}
          <div className={css.componentsContainer}>
            <Input
              id="title"
              autoComplete="title"
              name="title"
              register={register}
              placeholder="e.g. Product Manager"
              errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job category', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a category"
              options={catagoriesList}
              isSearchable
              onChange={(value) => console.log(value)}
              errors={errors['category']?.message ? [errors['category']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo(
            'Job description',
            'Write a few sentences about the job, what the requirements are, and your organization culture',
          )}
          <div className={css.componentsContainer}>
            <Input
              name="description"
              register={register}
              customHeight="128px"
              placeholder="Write a few sentences about the job"
              multiline
              errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Location', 'Job titles must describe one position')}
          <div className={css.componentsContainer}>
            <RadioGroup
              items={[
                { label: 'Anywhere', value: 'Anywhere' },
                {
                  label: 'Country / City',
                  value: 'Country / City',
                  children: (
                    <div className={css.componentsContainer}>
                      <SearchDropdown
                        id="city"
                        placeholder="Search for a city"
                        cacheOptions
                        isAsync
                        loadOptions={searchCities}
                        defaultOptions
                        className="my-5"
                        icon="search-lg"
                        hasDropdownIcon={false}
                        label="Location*"
                        onChange={(value) => {
                          onSelectCity(value);
                        }}
                      />
                    </div>
                  ),
                },
                // { label: 'In my timezone', value: 'In my timezone' },
              ]}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Remote preference', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a preference"
              options={PROJECT_REMOTE_PREFERENCES_V2}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job type', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a Type"
              options={PROJECT_TYPE_V2}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Job length', 'How long is the job?')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a time period"
              options={PROJECT_LENGTH_V2}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Payment type', 'Is it a paid or volunteer job?')}
          <div className={css.componentsContainer}>
            <RadioGroup items={PROJECT_PAYMENT_TYPE} onChange={(item) => console.log(item)} />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Payment terms / range', 'Specify the estimated payment range for this job.')}
          <div className={css.componentsContainer}>
            <RadioGroup
              items={[
                { label: 'Fixed', value: 'Fixed', children: renderAmountFields() },
                { label: 'Hourly', value: 'HOURLY', children: renderAmountFields() },
              ]}
              errors={['error']}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Experience level', '')}
          <div className={css.componentsContainer}>
            <SearchDropdown
              placeholder="Select a level"
              options={EXPERIENCE_LEVEL_V2}
              isSearchable
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        <div className={css.row}>
          {renderInfo('Experience level', '')}
          <div className={css.componentsContainer}>
            <MultiSelect
              id={'skills'}
              searchTitle={'Select at least 1 skill*'}
              max={20}
              maxLabel={'Max. 20 skills'}
              items={skills}
              placeholder={'Search a skill'}
              setComponentValue={() => {
                console.log;
              }}
              customHeight="200px"
              chipFontColor={variables.color_grey_blue_700}
              chipBorderColor={variables.color_grey_200}
              chipBgColor={variables.color_grey_blue_50}
              chipIconColor={variables.color_grey_blue_500}
              
            />
          </div>
        </div>
        <div className={css.footer}>
          <div className="flex space-x-3 ">
            <Button color="secondary" variant="outlined" onClick={onPreview}>
              Preview
            </Button>
            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)}>
              Publish
            </Button>
          </div>
        </div>
      </form>
      <JobPreviewModal open={openPreview} onClose={() => setOpenPreview(false)} />
      <AlertModal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} message="asdf" title="asdf" />
    </div>
  );
};
