import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import {CountryOption} from "@/components/CountrySelector/CountrySelectorTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CountryOption[]>
) {
  try {
    const response = await axios.get('https://restcountries.com/v2/all');
    const countries = response.data.map((country: any) => ({
      value: country.alpha2Code,
      label: country.name,
      flag: country.flags.svg
    }));
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json([]);
  }
}