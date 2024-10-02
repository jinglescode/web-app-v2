import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Education,
  EducationsReq,
  OrganizationReq,
  createOrganization,
  updateEducations,
  updateOrganization,
} from 'src/core/api';
import { getDaysInMonth, getUTCDate, monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import * as yup from 'yup';

const schema = yup.object().shape({
  credentialName: yup
    .string()
    .trim()
    .required('Required')
    .min(2, 'Must be 2-50 characters')
    .max(50, 'Must be 2-50 characters'),
  month: yup.object().shape({ label: yup.string().required('Required'), value: yup.string() }),
  day: yup.object().shape({ label: yup.string().required('Please indicate a day'), value: yup.string() }),
  year: yup.object().shape({ label: yup.string().required('Required'), value: yup.string() }),
});

interface OptionType {
  value: string;
  label: string;
}
export const useEducationDetails = (
  handleClose: () => void,
  education: Education,
  onUpdateEducation?: (experience: Education) => void,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [months, setMonths] = useState<OptionType[]>([]);
  const [days, setDays] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [dateError, setDateError] = useState('');
  const dateErrors =
    errors['month']?.label?.message || errors['day']?.label?.message || errors['year']?.label?.message || dateError;

  const mapMonthNames = () => {
    const options = monthNames.map((m, index) => {
      return { value: index.toString(), label: m };
    });
    setMonths(options);
  };

  const getDayOptions = () => {
    const yearValue = getValues().year?.value || new Date().getFullYear();
    const monthValue = Number(getValues().month?.value);
    const getAllDaysInMonth = monthValue !== undefined && getDaysInMonth(monthValue, Number(yearValue));
    const options = getAllDaysInMonth
      ? Array.from({ length: getAllDaysInMonth }, (_, index) => ({
          label: `${index + 1}`,
          value: `${index + 1}`,
        }))
      : [];
    setDays(options);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const start = 1970;
    const options: OptionType[] = [];
    for (let i = currentYear; i >= start; i--) {
      const year = i.toString();
      options.push({ value: year, label: year });
    }

    setYears(options);
  };

  const initializeValues = () => {
    const awardedDate = education?.end_at ? new Date(getUTCDate(education.end_at)) : undefined;

    const initialVal = {
      credentialName: education?.degree || '',
      month: {
        label: awardedDate ? monthNames[awardedDate.getMonth()] : '',
        value: awardedDate ? awardedDate.getMonth().toString() : '',
      },
      day: {
        label: awardedDate?.getDate().toString() || '',
        value: awardedDate?.getDate().toString() || '',
      },
      year: {
        label: awardedDate?.getFullYear().toString() || '',
        value: awardedDate?.getFullYear().toString() || '',
      },
    };
    reset(initialVal);
  };

  useEffect(() => {
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [education]);

  const monthVal = watch('month');
  const dayVal = watch('day');
  const yearVal = watch('year');

  const validateDates = () => {
    if (!yearVal?.label) return;
    const selectedDate = new Date(Number(yearVal?.label), Number(monthVal?.value || 0), Number(dayVal?.value || 1));
    const current = new Date();
    if (selectedDate > current) return 'Selected date cannot be later than current date';
    return;
  };

  useEffect(() => {
    const msg = validateDates();
    if (msg) {
      setDateError(msg);
    } else setDateError('');
  }, [monthVal, dayVal, yearVal]);

  useEffect(() => {
    getDayOptions();
  }, [monthVal, yearVal]);

  const onSelectMonth = month => {
    setValue('month', month, { shouldValidate: true });
  };

  const onSelectDay = day => {
    setValue('day', day, { shouldValidate: true });
  };

  const onSelectYear = year => {
    setValue('year', year, { shouldValidate: true });
  };

  const onSend = async () => {
    if (dateError) return;
    const { month, year, day, credentialName } = getValues();
    const startedDate = education.start_at ? new Date(getUTCDate(education.start_at)) : undefined;
    const title = education?.title || '';
    const grade = education?.grade || '';
    const description = education?.description || '';

    let organizationId = education.org?.id;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: education.org?.name || '', email: 'org@socious.io' }, false))
        .id;
    }

    const startDate = new Date(
      Number(startedDate?.getFullYear()),
      Number(startedDate?.getMonth() || 0),
      Number(startedDate?.getDate() || 1),
    ).toISOString();

    let payload: EducationsReq = {
      org_id: organizationId,
      title,
      degree: credentialName,
      grade,
      description,
      start_at: startDate,
    };
    if (year.value) {
      const endDate = new Date(Number(year.value), Number(month.value || 0), Number(day.value || 1)).toISOString();
      payload.end_at = endDate;
    }

    payload = removedEmptyProps(payload) as EducationsReq;
    const updatedEducation = await updateEducations(education.id, payload);
    if (!education.org.verified) {
      const org = { name: education.org.name, email: education.org.email } as OrganizationReq;
      updateOrganization(education.org.id, org);
    }
    onUpdateEducation?.(updatedEducation);
    handleClose();
  };

  return {
    register,
    errors,
    months,
    days,
    years,
    month: getValues().month,
    day: getValues().day,
    year: getValues().year,
    onSelectMonth,
    onSelectDay,
    onSelectYear,
    handleSubmit,
    onSend,
    dateErrors,
  };
};
