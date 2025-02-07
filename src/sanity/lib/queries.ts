import { groq } from "next-sanity";


export const allcars = groq`*[_type == "car"]`;
export const cars = groq `*[_type == "car"]`;