import axios from 'axios';
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: Request | NextRequest,
  context: any
) {
  const { params } = context

  try {
    const gdpPerCapitaResponse = await axios.get(`http://api.worldbank.org/v2/country/${params.code}/indicator/NY.GDP.PCAP.CD?format=json`);
    const country = gdpPerCapitaResponse.data[1][0]
    return NextResponse.json({gdp: country});
  } catch (error) {
    console.log("error ->", error)
    return NextResponse.json({ gdp: '', currency: '' });
  }
}
