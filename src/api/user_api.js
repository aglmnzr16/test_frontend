import { data } from "autoprefixer";
import axios from "axios";

export const userCreate = async (data) => {
  try {
    const result = await axios("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: data.name,
        job: data.job,
      },
      responseType: "json",
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const userGet = async (page) => {
  try {
    const result = await axios(`https://reqres.in/api/users?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const userUpdate = async (data) => {
  try {
    const result = await axios(`https://reqres.in/api/users/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const getSingleData = async (id) => {
  try {
    const result = await axios(`https://reqres.in/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const userDelete = async (id) => {
  try {
    const result = await axios(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    return result;
  } catch (error) {
    return error;
  }
};
