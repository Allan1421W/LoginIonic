import api from "../api/api";
import axios from "../libs/axios";
import { useAuthStore } from "../store/auth";

export const loginRequest = async (email: string, password: string) => {
  return api.post('/auth/login', {
    email,
    password
  });
};

export const profileRequest = async () => {
  return await axios.get('/auth/me')
};

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

  export const passwordRequest = async (password: string, email: string) => {
    try {
      const response = await axios.post('/auth/new-password', { password });
      return response.data; 
    } catch (error) {
      
      throw error;
    }
  };