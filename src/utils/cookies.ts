"use server";

import { cookies } from "next/headers";

const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY ?? '86400';
const refreshExpiry = process.env.ACCESS_TOKEN_EXPIRY ?? '604800';
export const setAccessToken = async (accessToken: any) => {
    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + parseInt(accessExpiry) * 24 * 60 * 60 * 1000),
      maxAge: parseInt(accessExpiry) * 24 * 60 * 60 * 1000,
    });
  };
  
  export const setRefreshToken = async (refreshToken: any) => {
    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + parseInt(refreshExpiry) * 24 * 60 * 60 * 1000),
      maxAge: parseInt(refreshExpiry) * 24 * 60 * 60 * 1000,
    });
  };
  export const getAccessToken = async () => {
    return cookies().get("accessToken")?.value;
  };
  
  
  export const getRefreshToken = async () => {
    return cookies().get("refreshToken")?.value;
  };
  
  export const deleteToken = async () => {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
  }

