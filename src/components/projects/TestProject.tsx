'use client';

import React, { useEffect } from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import AuthService from '@/services/auth.service';
import { getAccessToken, removeAccessFromStorage } from '@/services/auth.helper';

function TestProject() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
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
        removeAccessFromStorage();
        router.push('/login');
      }}
    >
      Выход
    </StandardButton>
  );
}

export default TestProject;
