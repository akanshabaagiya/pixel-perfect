import { describe, expect, it } from "vitest";
import { demoRequestSchema } from "./demo-request";

const valid = { name: "Alex", email: "alex@example.com", organization: "Example team", message: "" };

describe("demo request details", () => {
  it("allows the optional question to be empty", () => {
    expect(demoRequestSchema.safeParse(valid).success).toBe(true);
  });
  it("requires name, work email and organization", () => {
    for (const key of ["name", "email", "organization"]) {
      expect(demoRequestSchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
    }
  });
  it("rejects malformed email addresses", () => {
    expect(demoRequestSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false);
  });
  it("bounds the optional question", () => {
    expect(demoRequestSchema.safeParse({ ...valid, message: "a".repeat(1001) }).success).toBe(false);
  });
});