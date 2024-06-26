const { SignJWT, jwtVerify } = require("jose");
const { cookies } = require("next/headers");
const { NextRequest, NextResponse } = require("next/server");
import { model } from "mongoose";
import { Code, CodeSchema } from "@/app/model/code";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function login(formData) {
  try {
    // Verify credentials && get the user
    const user = { email: formData.email, name: "John" };

    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  } catch (error) {
    console.log(error);
  }
}

async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

async function register() {
  try {
    const username = Math.random().toString(36).substring(2, 10);
    const date = Date.now();
    model("Code").schema.add({ groupe: { type: String } });
    const groupe = "G3";
    const code = await Code.create({
      username,
      date,
      groupe,
    });
    console.log(`Code ${username} generated`);
    return code;
  } catch (error) {
    console.log("Error :", error);
  }
}

module.exports = {
  encrypt,
  decrypt,
  login,
  logout,
  getSession,
  updateSession,
  register,
};
