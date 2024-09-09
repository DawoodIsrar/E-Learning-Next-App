import { set, isEmpty } from "lodash";

export const fixNumbers = (str, removeSpaces) => {
  var persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  var arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str
        .replace(persianNumbers[i], String(i))
        .replace(arabicNumbers[i], String(i));
    }
  }
  return removeSpaces ? str.trim().replace(/ /g, "") : str?.trim();
};

export default async function AppService({
  url,
  method,
  params,
  headers = {},
  form = null,
  token = "",
}) {
  set(headers, "Accept", "application/json");
  set(headers, "Content-Type", "application/json");
  set(headers, "Accept-Language", "en");
  set(headers, "Authorization", `Bearer ${token}`);

  const reqBody = {
    method,
    cache: "no-cache", // Don’t cache
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  } else if (form) {
    reqBody.body = form;
  }

  const cleanedRequest = form
    ? reqBody
    : JSON.parse(fixNumbers(JSON.stringify(reqBody)));
  const cleanedUrl = fixNumbers(url);

  return fetch(
    cleanedUrl,
    form
      ? {
          ...reqBody,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          //  sign  al: abortController.signal
        }
      : {
          ...cleanedRequest,
          headers,
          // signal: abortController.signal,
        }
  )
    .then(async (response) => {
      const res = await response?.json();

      if (response?.status < 200 || response?.status >= 300) {
        return {
          result: "error",
          data: null,
          error: res,
          authorized: false,
        };
      } else {
        return res;
      }
    })
    .then((data) => {
      if (data?.result === "error") {
        return data;
      }
      return {
        result: "ok",
        data,
        error: null,
        authorized: true,
      };
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export async function makeApiRequest(url) {
  try {
    const response = await fetch(url, {
      method: "GET", // Use the appropriate HTTP method (GET, POST, etc.)
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_MAP_TOKEN}`, // Include the token in the 'Authorization' header
        "Content-Type": "application/json", // Set the content type if needed
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Assuming the response is JSON, you can parse it here if needed
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
}
