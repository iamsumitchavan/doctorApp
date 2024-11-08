import crypto from 'node:crypto';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AppointFilePath = path.join(
  process.cwd(),
  'public/mocks/patientAppointmentDetail.json',
);

export async function GET() {
  try {
    const list = await fsPromises.readFile(AppointFilePath, 'utf-8');
    const json = JSON.parse(list);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: `No dishes found! ${error}` }),
      {
        status: 404,
        headers: { 'content-type': 'application/json' },
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const d = await fsPromises.readFile(AppointFilePath, 'utf-8');

    const jsonArray = JSON.parse(d);

    const { fullName, gender, age, phone, problem, relation, weight, doctor }
      = await req.json();

    const id = crypto.randomBytes(16).toString('hex');

    jsonArray.push({
      id,
      fullName,
      gender,
      age,
      phone,
      problem,
      relation,
      weight,
      doctor,
    });

    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(AppointFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: 'data created successfully!' }),
      { status: 201, headers: { 'content-type': 'application/json' } },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error reading or parsing the JSON file! ${error}`,
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
