'use client';
import { supabase } from '@/Services/SupabaseClient';
import { UserDetailContext } from '@/context/UserDetailContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

import React, { useState, useEffect, useContext } from 'react';

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage first for immediate UI update
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    createNewUser();
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  const createNewUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
      .eq('Email', user?.email);

    console.log(Users);

    if (Users?.length === 0) {
      const { data, error } = await supabase.from('Users').insert([
        {
          Name: user?.user_metadata?.name,
          Email: user?.email,
          picture: user?.user_metadata?.picture,
        },
      ]);
      console.log(data);
      setUser(data);
      return;
    }
    setUser(Users[0]);
  };
  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
