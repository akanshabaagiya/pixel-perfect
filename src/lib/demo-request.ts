import { z } from "zod";

export const demoRequestSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "Use 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid work email.").max(255),
  organization: z.string().trim().min(1, "Please enter your organization.").max(150),
  message: z.string().trim().max(1000, "Use 1,000 characters or fewer."),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
export const emptyDemoRequest: DemoRequest = { name: "", email: "", organization: "", message: "" };