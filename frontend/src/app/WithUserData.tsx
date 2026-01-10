import { ReactNode } from 'react';
import { useUserQuery } from '@hooks/users';

type Props = {
  children: ReactNode;
};

export default function WithUserData({ children }: Props) {
  const { isLoading, isError } = useUserQuery();

  if (isLoading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (isError) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
