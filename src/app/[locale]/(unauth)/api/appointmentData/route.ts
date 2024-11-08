import fsPromises from 'node:fs/promises';
import path from 'node:path';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { doctorList } from '@/types';

type appointment = {
  id: string;
  appointmentId: string;
  doctor: doctorList;
  date: string;
  timeSlot: string;
};

const AppointFilePath = path.join(
  process.cwd(),
  'public/mocks/appointmentlist.json',
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

    const { id, appointmentId, doctor, date, timeSlot } = await req.json();

    jsonArray.push({ id, appointmentId, doctor, date, timeSlot });

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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const dishes = await fsPromises.readFile(AppointFilePath, 'utf-8');

    const jsonArray = JSON.parse(dishes);

    const dishIndex = jsonArray.findIndex(
      (dish: appointment) => dish.id === id,
    );

    // Step 4.1: if dish can't be found, return 404
    if (dishIndex < 0) {
      return new NextResponse(JSON.stringify({ message: 'Dish not found!' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Step 5: remove dish from JSON array
    jsonArray.splice(dishIndex, 1);

    // Step 6: convert JSON array back to string
    const updatedData = JSON.stringify(jsonArray);

    // Step 7: write the updated data to the JSON file
    await fsPromises.writeFile(AppointFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: 'Dish deleted successfully!' }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error reading or parsing the JSON file!${error}`,
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
