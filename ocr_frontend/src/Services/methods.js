

const BaseURL = process.env.REACT_APP_API_URL;

console.log(BaseURL)


const postFormData = async (url,formData,isAuthenticated) => {
  const headers = {
    // "Content-Type": "application/json",
    // Accept: "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("uAuth");
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${BaseURL}/${url}`, {
    mode: "cors",
    method: "POST",
    headers: headers,
    body: formData,
  });
  try {
    const result1 = await response.json();
    return result1;
  } catch (e) {
    console.error(e,"error");
  }
};

const postJSONData = async (url,body,isAuthenticated) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (isAuthenticated) {
    const token = localStorage.getItem("uAuth");
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${BaseURL}/${url}`, {
    mode: "cors",
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  try {
    const result1 = await response.json();
    return result1;
  }
  catch (e) {
    console.error(e,"error");
  }
};


export {postFormData ,postJSONData };