import { buttonClasses } from "@/components/Button/buttonClasses";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-2 text-whit bg-grey-200">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we could not find the page you were looking for.</p>
      <Link href="/" className={buttonClasses("black")}>
        Return Home
      </Link>
    </div>
  );
}
