import useCommits from '@/hooks/useCommits';

import React from 'react';

const ListComments = () => {
  const { commits } = useCommits('6');

  return <div>ListComments</div>;
};

export default ListComments;
