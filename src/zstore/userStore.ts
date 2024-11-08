import { create } from 'zustand';

// "user": {
//         "id": 528,
//         "full_name": "Tomcruise",
//         "email": "cruise121@gmail.com",
//         "remember_me_token": null,
//         "created_at": "2024-10-21T15:18:12.000+00:00",
//         "updated_at": "2024-10-21T15:18:12.000+00:00"
//     },
//     "token": "bearer NTE3NA.yyeDVGQogFs_p7rtVrqNITjVi3dvxLP18PgUXC445kVuV5tH7Qm9E2234MgP"
// }

type UserState = {
  user: null | {
    id: number;
    full_name: string;
    email: string;
    remember_me_token: string | null;
    created_at: string;
    updated_at: string;
  };
  token: string | null;
  setUser: (
    user: {
      id: number;
      full_name: string;
      email: string;
      remember_me_token: string | null;
      created_at: string;
      updated_at: string;
    },
    token: string
  ) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));
