import { Link } from "react-router-dom";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";

export default function NoMatch() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content relative text-center">
        <div className="max-w-md">
          <MagnifyingGlassMinusIcon className="text-primary mx-auto my-4 size-14 text-5xl font-bold" />
          <h1 className="text-primary text-5xl font-bold">มันหายไป!</h1>
          <p className="pb-6">
            เราพยายามหาหน้านี้ทุกซอกทุกมุมแล้ว แต่ก็ไม่เจออะไรเลย
          </p>
          <Link className="btn btn-primary" to="/">
            กลับดีกว่า
          </Link>

          {/* Decorative Elements */}
          <div className="bg-primary/20 absolute inset-0 -z-10 size-96 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
