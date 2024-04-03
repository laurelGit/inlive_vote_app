import { logout } from "@/app/services/lib";

export async function GET() {
  await logout({ email: "laurel@gmail.com" });
  return new Response("Logged In");
}
