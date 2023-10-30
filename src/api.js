import axios from "axios";

const apiUrl = "https://webauthn-server-dun.vercel.app/api";

export const signup = async (data) => {
  const response = await axios(`${apiUrl}/signup`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const login = async (data) => {
  const response = await axios(`${apiUrl}/login`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const verifyRegistration = async (data) => {
  const response = await axios(`${apiUrl}/verify-reg-options`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const verifyAuthentication = async (data) => {
  const response = await axios(`${apiUrl}/verify-auth-options`, {
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
