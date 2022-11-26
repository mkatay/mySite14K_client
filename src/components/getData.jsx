import axios from "axios";

const url="";

export const checkUsername= async (formdata) => {
  const response = await axios.post(url+'/auth/checkUsername', formdata);
  return await response;
};

export const login= async (formdata) => {
  console.log("getData:",formdata);
  const response = await axios.post(url+'/auth/login', formdata);
  return await response;
};
export const checkEmail= async (formdata) => {
  const response = await axios.post(url+'/auth/checkEmail', formdata);
  return await response;
};

export const register= async (formdata) => {
  console.log("getData:",formdata);
  const response = await axios.post(url+'/auth/register', formdata);
  return await response;
};
export const updateAvatar= async (formdata) => {
  console.log("getData:",formdata);
  const response = await axios.put(url+'/auth/updateAvatar', formdata,{headers: { "Content-Type": "multipart/form-data" },});
  return await response;
};
export const deleteUser= async (data) => {
  const response = await axios.delete(url+'/auth/deleteUser/'+data.username);
  return await response;
};

/*

export const getCateg = async () => {
  const response = await axios.get("/categ");
  return await response;
};

export const getBooks = async ({ queryKey }) => {
  const [_key, selCateg,title] = queryKey;
  console.log('querykey:',queryKey)
  console.log('1-es:',queryKey[1].length)
  if(queryKey[2].length>0){
    const response = await axios.get(`/books/title/${title}`);
    return await response;
  }
  else if (queryKey[1].length > 0) {
    const response = await axios.get(`/books/${selCateg}`);
    return await response;
  } else {
    console.log('mi van?')
    const response = await axios.get(`/books`);
    return await response;
  }
};
*/