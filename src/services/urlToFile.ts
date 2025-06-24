import axios from "axios";

export const urlToObject = async (url?: string, fileName?: string) => {
  if (!url) return null;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store', 
  })
  const blob = await response.blob();
  const result = new File([blob], fileName || "file", { type: blob.type });
  return result || null;
};
