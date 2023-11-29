import React, { useContext, useEffect, useReducer } from 'react';
import { profile } from 'src/core/api';

const initialState = {
  bio: '',
  city: '',
  country: '',
  first_name: '',
  last_name: '',
  mission: '',
  mobile_country_code: '',
  phone: '',
  skills: [],
  social_causes: [],
  username: '',
  avatar: '',
  address: '',
};
const orgInitialState = {
  orgName: '',
  orgType: { value: 'STARTUP', label: 'Impact Startup' },
  social_causes: [],
  bio: '',
  image: '',
  city: '',
  country: '',
  email: '',
  website: '',
  size: null,
  shortname: '',
  industry: '',
};
const type = localStorage.getItem('registerFor');

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      const filteredPayload = Object.keys(action.payload).reduce((filtered, key) => {
        if (state.hasOwnProperty(key)) {
          filtered[key] = action.payload[key];
        }
        return filtered;
      }, {});
      return {
        ...state,
        ...filteredPayload,
      };
    default:
      return state;
  }
};
console.log('init state for', type);
export const UserContext = React.createContext(type === 'user' ? initialState : orgInitialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, type === 'user' ? initialState : orgInitialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await profile();
        dispatch({ type: 'UPDATE_USER', payload: userProfile });
      } catch (error) {
        console.error(error);
      }
    };
    if (type === 'user') fetchData();
  }, []);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('must be used within a provider');
  }

  const { state, dispatch } = context;

  const updateUser = (updates) => {
    console.log('new state', state);
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };
  return { updateUser, state };
};