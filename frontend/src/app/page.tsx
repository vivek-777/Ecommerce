import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>My Application</h1>

      <Link href="/login">Login</Link>
      {" | "}
      <Link href="/signup">Sign Up</Link>
    </main>
  );
}