import React, { useContext, useEffect, useReducer } from 'react';
import { profile } from 'src/core/api';

const initialState = {
  bio: '',
  city: '',
  country: '',
  cityLabel: '',
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
  orgName: '',
  orgType: { value: 'STARTUP', label: 'Impact Startup' },
  image: '',
  email: '',
  website: '',
  size: null,
  shortname: '',
  industry: '',
};

let type = localStorage.getItem('registerFor');

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      const filteredPayload = Object.keys(action.payload).reduce((filtered, key) => {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          filtered[key] = action.payload[key];
        }
        return filtered;
      }, {});

      return {
        ...state,
        ...filteredPayload,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
export const UserContext = React.createContext(initialState);

export interface UserProviderProps {
  children: any;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await profile();
        dispatch({ type: 'UPDATE_USER', payload: userProfile });
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem('registerFor') === 'organization')
      dispatch({ type: 'UPDATE_USER', payload: initialState });
    else fetchData();
  }, []);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('must be used within a provider');
  }
  const { state, dispatch } = context;

  const updateUser = updates => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };
  const reset = () => {
    type = 'user';
    dispatch({ type: 'RESET' });
  };
  return { updateUser, reset, state };
};
