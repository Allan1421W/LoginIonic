import api from "../api/api";
import axios from "../libs/axios";

export const loginRequest = async (email: string, password: string) => {
  try {
    return api.post('/auth/login', {
      email,
      password
    })
  } catch (error) {
      throw error
  }
};

export const profileRequest = async () => {
  try {
    return await axios.get('/auth/me')
  } catch (error) {
    throw error
  }
}

export const updateRequest = async (dataProfile: any) => {
  return await axios.patch('/auth/me', dataProfile);
};

type dataProfile = {
    firstName: string,
    lastName: string,
    gender: string,
    city: string,
    documentNumber: string,
    phoneNumber: string,
}
export async function performUpdateRequest(data: dataProfile) {
    try {
      const response = await updateRequest(data);
      return response;
    } catch (error) {
        throw new Error('Error al actualizar el perfil: ' + error);
    }
  }

export const passwordRequest = async (password: string, email: string, code: number) => {
  try {
    const response = await axios.post('/auth/new-password', { password, email, code });
    return response.data; 
  } catch (error) {
     throw error;
  }
};

export const codeRequest = async (email: string) => {
  try {
    return await axios.post('/auth/forgot-password', { email })
  } catch (error) {
    throw error;
  }
}