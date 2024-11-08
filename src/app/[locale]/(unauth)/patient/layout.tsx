import { DemoBanner } from '@/components/DemoBanner';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DemoBanner />
      <div className="p-6">{children}</div>
    </div>
  );
}
