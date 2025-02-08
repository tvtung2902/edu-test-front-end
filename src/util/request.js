const API_SERVER = "http://localhost:6969/api/"
export const get = async (path) => {
  const response = await fetch(`${API_SERVER}${path}`);
  const result = await response.json();
  return result;
}

export const post = async (path, data) =>{
  const res = await fetch(`${API_SERVER}${path}`,{
    method: "POST",
    headers: {
      Accept : "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return res.json();
}

export const postFormData = async (path, data) =>{
  const res = await fetch(`${API_SERVER}${path}`,{
    method: "POST",
    headers: {
      Accept : "application/json",  
    },
    body: data
  })
  return res.json();
}

export const del = async (path) => {
  const res = await fetch(`${API_SERVER}${path}`,{
    method: "DELETE",
  })
  return res.json(); 
}

export const put = async (path, data) => {
  const res = await fetch(`${API_SERVER}${path}`,{
    method: "PUT",
    headers: {
      Accept : "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }) 
  return res.json();
}

export const patch = async (path, data) => {
  const res = await fetch(`${API_SERVER}${path}`,{
    method: "PATCH",
    headers: {
      Accept : "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }) 
  return res.json();
}