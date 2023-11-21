import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import {CountryOption} from "@/components/CountrySelector/CountrySelectorTypes";
import {NextResponse} from "next/server";

export async function GET() {

  try {
    const response = await axios.get('https://restcountries.com/v2/all');
    const countries = response.data.map((country: any) => ({
      value: country.alpha2Code,
      label: country.name,
      flag: country.flags.svg
    }));
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json([]);
  }
}