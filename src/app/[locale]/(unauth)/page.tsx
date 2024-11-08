'use client';

import { useRouter } from 'next/navigation';
import { FaUserDoctor } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';

// import { useTranslations } from "next-intl";
// import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

// import { Sponsors } from "@/components/Sponsors";

// export async function generateMetadata(props: { params: { locale: string } }) {
//   const t = await getTranslations({
//     locale: props.params.locale,
//     namespace: "Index",
//   });

//   return {
//     title: t("meta_title"),
//     description: t("meta_description"),
//   };
// }

// props: { params: { locale: string } }

const Index = () => {
  // unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations("Index");

  const router = useRouter();

  const handleRoleSelection = (role: 'doctor' | 'patient') => {
    if (role === 'doctor') {
      router.push('/doctor-dash');
    } else if (role === 'patient') {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-1/2 space-y-16 rounded-lg border border-card-line p-5 shadow-lg ">
          <div className="flex gap-7">
            <FaUserDoctor className="text-3xl text-slate-500" />
            <h1 className="leading-8s text-2xl font-semibold text-[#000000]">
              select your Role
            </h1>
          </div>
          <div className="flex gap-6">
            <Button
              className="w-full"
              onClick={() => handleRoleSelection('doctor')}
            >
              Doctor
            </Button>
            <Button
              className="w-full"
              onClick={() => handleRoleSelection('patient')}
            >
              Patient
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
