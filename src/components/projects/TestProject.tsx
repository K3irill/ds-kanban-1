import React from 'react';
import StandardButton from '@/components/ui/Button/StandardButton/StandardButton';
import { useRouter } from 'next/router';

function TestProject() {
  const router = useRouter();
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
