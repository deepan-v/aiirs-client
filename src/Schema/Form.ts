"use client";

import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email id Required" })
    .email({ message: "Invalid E-mail" }),
  password: z.string().min(1, { message: "Password Required" }),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BannerSchema = z.object({
  banner_title: z.string().min(10, { message: "Min ten character Required !" }),
  from_date: z.string().min(1, { message: "Please Select The Date" }),
  to_date: z.string().min(1, { message: "Please Select The Date" }),
  course_name: z.string().min(1, { message: "Required" }),
  price: z.string().min(1, { message: "Required" }),
  student_enrolled: z.string().min(1, { message: "Required" }),
  venue: z.string().min(1, { message: "Required" }),
  program_timing: z.string().min(1, { message: "Required" }),
  selectImage: z
    .any()
    .refine((val) => val instanceof File || typeof val === "string", {
      message: "Must be a file or a string URL",
    }),
});

export const overViewSchema = z.object({
  program_overview: z
    .string()
    .min(10, { message: "Min ten character Required !" }),
  youtube_link: z.string().url(),
});

export const cardSchema = z.object({
  course_name: z.string().min(1, { message: "Required" }),
  student_enrolled: z.string().min(1, { message: "Required" }),
  razorURL: z.string().min(1, { message: "Required" }),
  color: z.string().min(1, { message: "Required" }),
  price: z.string().min(1, { message: "Required" }),
  rating: z.string().min(1, { message: "Required" }),
  button_text: z.string().min(1, { message: "Required" }),
  discount_price: z.string().min(1, { message: "Required" }),
  selectImage: z
    .any()
    .refine((val) => val instanceof File || typeof val === "string", {
      message: "Must be a file or a string URL",
    }),
});
export const createCardSchema = z.object({
  course_name: z.string().min(1, { message: "Required" }),
  student_enrolled: z.string().min(1, { message: "Required" }),
  price: z.string().min(1, { message: "Required" }),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
  razorURL: z.string().url(),
  discount_price: z.string().min(1, { message: "Required" }),
  rating: z.string().min(1, { message: "Required" }),
  button_text: z.string().min(1, { message: "Required" }),
  selectImage: z
    .custom<File>((v) => v instanceof File, {
      message: "Image is required",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const MentorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  department: z.string().min(1, "Department is required"),
  university: z.string().min(1, "University is required"),
  location: z.string().min(1, "Location is required"),
  selectImage: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Image is required",
    }),
});

export const CourseSchema = z.object({
  courseName1: z.string().min(1, { message: "Course name is required" }),
  courseName2: z.string().min(1, { message: "Course name is required" }),
  coursePrice1: z.string().min(1, { message: "Price is required" }),
  coursePrice2: z.string().min(1, { message: "Price is required" }),
  razorLink: z.string().url(),
  discountPrice: z.string().min(1, { message: "Discount Price is required" }),
  courseImage1: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Course image is required",
    }),
  courseImage2: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Course image is required",
    }),
});

export const featureCardSchema = z.object({
  icon: z.string().min(1, "Icon is required"),
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
});

export const ProgramContentSchema = z.object({
  title: z.string().min(2, "Title is required"),
});
