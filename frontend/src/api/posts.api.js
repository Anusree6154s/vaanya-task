import { backendURL } from "../utils/constants";

export const addPost = async (formData) => {
  try {
    await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const getPosts = async () => {
  try {
    const res = await fetch(backendURL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting posts:", error);
  }
};

export const updatePost = async (id, formData) => {
  try {
    await fetch(`${backendURL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

export const deletePost = async (id) => {
  try {
    await fetch(`${backendURL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};
