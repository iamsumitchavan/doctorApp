// import { useParams } from "next/navigation";
// import { useFetchDoctor } from "../hook/useFetchDoctor";

// export function withDoctorData<
//   T extends { doctor: ReturnType<typeof useFetchDoctor>["doctor"]; id: string },
// >(WrappedComponent: React.ComponentType<T>) {
//   return function WithDoctorData(props: Omit<T, "doctor">) {
//     const params = useParams();
//     const id = params.id;
//     const { doctor } = useFetchDoctor(id?.toString());

//     return <WrappedComponent {...(props as T)} doctor={doctor} />;
//   };
// }

import { useParams } from 'next/navigation';

import { useFetchDoctor } from '../hook/useFetchDoctor';

export function withDoctorData<
  T extends { doctor: ReturnType<typeof useFetchDoctor>['doctor'] },
>(WrappedComponent: React.ComponentType<T>) {
  return function WithDoctorData(props: Omit<T, 'doctor'>) {
    const params = useParams();
    const id = params.id as string;
    const { doctor } = useFetchDoctor(id);

    return <WrappedComponent {...(props as T)} doctor={doctor} id={id} />;
  };
}
