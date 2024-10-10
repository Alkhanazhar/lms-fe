const getHeaders = (authRequired = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (authRequired) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// GET request
export const getData = async (endpoint, authRequired = true) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getHeaders(authRequired),
    });
    return await response.json();
  } catch (error) {
    console.error("GET request failed", error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint, data, authRequired = true) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getHeaders(authRequired),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("POST request failed", error);
    throw error;
  }
};

// PUT request
export const putData = async (endpoint, data, authRequired = true) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders(authRequired),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("PUT request failed", error);
    throw error;
  }
};

// PATCH request
export const patchData = async (endpoint, data, authRequired = true) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: getHeaders(authRequired),
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("PATCH request failed", error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint, authRequired = true) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(authRequired),
    });
    return await response.json();
  } catch (error) {
    console.error("DELETE request failed", error);
    throw error;
  }
};
