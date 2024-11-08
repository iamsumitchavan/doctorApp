import crypto from 'node:crypto';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const doctorListFilePath = path.join(
  process.cwd(),
  'public/mocks/doctorsAppointment.json',
);

export async function POST(req: NextRequest) {
  try {
    // Step 1: read json file
    const dishes = await fsPromises.readFile(doctorListFilePath, 'utf-8');

    // Step 2: parse it into a JSON array
    const jsonArray = JSON.parse(dishes);

    // Step 3: destructure values from request body
    const {
      age,
      doctor,
      fullName,
      gender,
      phone,
      problem,
      relation,
      weight,
      status,
    } = await req.json();

    // Step 4: generate the ID for the new dish
    const id = crypto.randomBytes(16).toString('hex');

    // Step 5: add the new dish to the json array
    jsonArray.push({
      id,
      age,
      doctor,
      fullName,
      gender,
      phone,
      problem,
      relation,
      weight,
      status,
    });

    // Step 6: convert JSON array back to string
    const updatedData = JSON.stringify(jsonArray);

    // Step 7: write the updated data to the JSON file
    await fsPromises.writeFile(doctorListFilePath, updatedData);

    // Step 8: return response of a successful post (201)
    return new NextResponse(
      JSON.stringify({ message: 'Dish created successfully!' }),
      { status: 201, headers: { 'content-type': 'application/json' } },
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: `Error reading or parsing the JSON file!1 ${error}`,
      }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
