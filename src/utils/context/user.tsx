import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

interface ImagesType {
  height: number | null;
  width: number | null;
  url: string;
}
interface UserType {
  display_name: string;
  external_urls: Object;
  followers: Object;
  href: string;
  id: string;
  images: Array<ImagesType>;
  type: string;
  uri: string;
}

interface UserContextType {
  currentUser: UserType;
}

const initialUserType: UserType = {
  display_name: '',
  external_urls: {},
  followers: {},
  href: '',
  id: '',
  images: [],
  type: '',
  uri: ''
};

interface Props {
  children?: React.ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<Props> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  const [user, setUser] = useState(initialUserType);

  const fetchUser = async () => {
    try {
      if (!accessToken) return;
      const res = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setUser(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ currentUser: user }}>{children}</UserContext.Provider>;
};
