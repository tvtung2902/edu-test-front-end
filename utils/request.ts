const API_SERVER = "http://localhost:6969/api/";

export const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_SERVER}${path}`);

  return response.json();
};

export const post = async <T>(path: string, data: any): Promise<T> => {
  const response = await fetch(`${API_SERVER}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const postForFormData = async<T>(path: any, data: FormData): Promise<T> => {
  const res = await fetch(`${API_SERVER}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  });
  return res.json();

};

export const put = async <T>(path: string, data: any): Promise<T> => {
  const response = await fetch(`${API_SERVER}${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const putForFormData = async<T>(path: string, data: FormData): Promise<T> => {
  const res = await fetch(`${API_SERVER}${path}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: data,
  });
  return res.json();

};

export const patch = async <T>(path: string, data: any): Promise<T> => {
  const response = await fetch(`${API_SERVER}${path}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const del = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_SERVER}${path}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  return response.json();
};