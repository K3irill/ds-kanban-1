'use client';

import React, { useEffect } from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import AuthService from '@/services/auth.service';

function TestProject() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);

  const { data } = useQuery({
    queryKey: ['projects'],
    queryFn: () => AuthService.getUser(),
  });
  console.log(data);

  return (
    <StandardButton
      onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}
    >
      Выход
    </StandardButton>
  );
}

export default TestProject;
