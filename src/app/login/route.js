import { login } from "@/app/services/lib";

export async function GET() {
  await login({ email: "laurel@gmail.com" });
  return new Response("Logged In");
}
