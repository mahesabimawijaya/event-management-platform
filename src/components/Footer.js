import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-violet-900 text-white py-8 rounded-t-3xl mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">UniFy</h2>
          <p className="text-sm">Your Dreams, Our Reality</p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/events" className="text-gray-300 hover:text-white">
            Events
          </Link>
          <Link href="/teams" className="text-gray-300 hover:text-white">
            Teams
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-600">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-sm text-white mb-4 md:mb-0">
            &copy; 2024 UniFy. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
