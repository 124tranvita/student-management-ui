/** BASE PATH */
export const BASE_URL = "https://fine-deer-attire.cyclic.app/api/v1/";
// export const BASE_URL = "https://code.nezumi.asia/proxy/4100/api/v1/";

/** GET REQUEST */
export const getData = async (path: string, refreshToken: string) => {
  const url = BASE_URL + path;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
};

/** POST REQUEST */
export const postData = async <T>(
  path: string,
  refreshToken: string,
  value: T
) => {
  const url = BASE_URL + path;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    console.log({ response });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });
  }
};
