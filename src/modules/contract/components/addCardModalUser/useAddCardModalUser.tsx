import { useEffect, useState } from 'react';
import { Offer, stripeLink as getStripeLinkApi } from 'src/core/api';

export const useAddCardModalUser = (offer: Offer) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stripeLink, setStripeLink] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSelectCountry = country => {
    if (country.value !== selectedCountry) setStripeLink('');
    setSelectedCountry(country.value);
  };

  const getStripeLink = async (country: string) => {
    try {
      const result = await getStripeLinkApi({
        country: country,
        is_jp: offer.currency === 'JPY',
        redirect_url: window.location.href,
      });
      const {
        link: { url },
      } = result;
      setStripeLink(url);
    } catch (err: any) {
      setErrorMsg(err?.response?.data.error || err?.message);
      setOpenErrorModal(true);
    }
  };

  useEffect(() => {
    if (selectedCountry) getStripeLink(selectedCountry);
  }, [selectedCountry]);

  return { countries, selectedCountry, onSelectCountry, errorMsg, openErrorModal, setOpenErrorModal, stripeLink };
};
