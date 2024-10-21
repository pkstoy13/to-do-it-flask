// app/page.js
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/TDI-Flask.png"
        width={300}
        height={300}
        alt="To-Do-It"
        priority={true}
      />
      <div className="text-2xl">
        <Link href="/login" className="hover:bg-slate-200 p-2 px-8">
          Login
        </Link>

        <Link href="/register" className="hover:bg-slate-200 p-2 px-5">
          Register
        </Link>
      </div>
    </div>
  );
}
