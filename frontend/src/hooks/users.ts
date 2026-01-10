import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { request } from '@utils';

/* =======================
   Types
======================= */

type User = {
  id: number;
  email: string;
};

type UserQueryData = {
  logged_in: boolean;
  user: User | null;
};

/* =======================
   Safe fetch user
======================= */

const fetchUser = async (): Promise<UserQueryData> => {
  try {
    const response = await request('/users/data/', { method: 'get' });

    if (
      typeof response.data?.logged_in !== 'boolean' ||
      !('user' in response.data)
    ) {
      return { logged_in: false, user: null };
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        return { logged_in: false, user: null };
      }
    }

    return { logged_in: false, user: null };
  }
};

/* =======================
   Queries
======================= */

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: fetchUser,
    staleTime: 60_000,
    retry: false,
  });
};

/* =======================
   Auth helpers
======================= */

export const useLoggedIn = () => {
  const { data, isLoading } = useUserQuery();

  return {
    loggedIn: Boolean(data?.logged_in),
    isLoading,
  };
};

export const useUser = () => {
  const { data } = useUserQuery();
  return data?.user ?? null;
};

export const useRefetchUserData = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ['user-data'],
    });
};

/* =======================
   Actions
======================= */

export const useSignup = () => {
  const navigate = useNavigate();

  return async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    await request('/users/signup/', {
      method: 'post',
      data: { email, password, confirmPassword },
    });

    navigate('/login');
  };
};

export const useLogin = () => {
  const refetchUserData = useRefetchUserData();

  return async ({ email, password }: { email: string; password: string }) => {
    await request('/users/login/', {
      method: 'post',
      data: { email, password },
    });

    await refetchUserData();
  };
};

export const useLogout = () => {
  const refetchUserData = useRefetchUserData();

  return async () => {
    try {
      await request('/users/logout/', { method: 'post' });
    } finally {
      await refetchUserData();
    }
  };
};
