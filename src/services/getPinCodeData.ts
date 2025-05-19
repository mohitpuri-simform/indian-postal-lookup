import { type PinCodeData } from "../types/PinCodeData";

export async function getPinCodeData(pinCode: string): Promise<PinCodeData[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_PATH_PIN_CODE_URL}${pinCode}`
  );
  const data = await response.json();
  return data;
}

export async function getPostOfficeData(
  postOfficeName: string
): Promise<PinCodeData[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_PATH_POST_OFFICE_URL}${postOfficeName}`
  );
  const data = await response.json();
  return data;
}
