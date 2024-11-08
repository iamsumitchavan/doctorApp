import fsPromises from 'node:fs/promises';
import path from 'node:path';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const doctorListFilePath = path.join(
  process.cwd(),
  'public/mocks/patientAppointmentDetail.json',
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const list = await fsPromises.readFile(doctorListFilePath, 'utf-8');

    const doctorList = JSON.parse(list);

    const doctor = doctorList.find((doc: any) => doc.id === params.id);

    if (!doctor) {
      return new NextResponse(
        JSON.stringify({ message: 'Doctor not found!' }),
        { status: 404, headers: { 'content-type': 'application/json' } },
      );
    }

    return NextResponse.json(doctor);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `Error reading the file! ${error}${req}` }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
