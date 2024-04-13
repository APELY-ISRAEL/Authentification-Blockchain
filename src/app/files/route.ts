import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import PinataClient, { PinataPinOptions, PinataConfig } from "@pinata/sdk";
function extractFileName(path: string): string {
  const regex = /[^\\\/]*$/;
  const matches = path.match(regex);
  return matches ? matches[0] : '';
}
export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    const prefix= `C:\\Users\\israe\\Documents\\`
   const fileName=extractFileName(requestData.image)
   const imageUrl=prefix+fileName;
   const stream = fs.createReadStream(imageUrl);
   console.log(imageUrl);
    const options: PinataPinOptions = {
      pinataMetadata: {
        name: requestData.firstname
      },
    };
   const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;
   console.log();
    const pinataConfig: PinataConfig = {
      pinataApiKey: PINATA_API_KEY,
    pinataSecretApiKey: PINATA_API_SECRET,
     pinataJWTKey: PINATA_JWT
    };
    const pinata = new PinataClient(pinataConfig);
    const result = await pinata.pinFileToIPFS(stream, options);
    const updatedRequestValue = {
      ...requestData,
      image: result.IpfsHash
    };
    const jsonpin= pinata.pinJSONToIPFS(updatedRequestValue)
    const data = {
      image: result.IpfsHash,
      document: (await jsonpin).IpfsHash
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
