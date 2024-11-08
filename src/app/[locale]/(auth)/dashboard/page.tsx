import 'react-toastify/dist/ReactToastify.css';

import { getTranslations } from 'next-intl/server';
// import PatientHome from "@/components/patient/patient-home";
import { ToastContainer } from 'react-toastify';

import PatientonboardingPage from '@/components/patient/patient-onboardingpage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Dashboard = () => (
  <>
    <ToastContainer />
    {/* <PatientHome /> */}
    <PatientonboardingPage />
  </>
);

export default Dashboard;
