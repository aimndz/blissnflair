import { HouseIcon, Mail, Phone } from "lucide-react";
import Logo from "./components/icons/Logo";
import { Facebook } from "iconsax-react";

function Home() {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      {/* Content Wrapper */}
      <div className="w-full text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-semibold text-gray-800">
          Welcome to <span className="text-primary-200">Bliss and Flair</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-lg text-sm text-gray-600">
          Your ultimate destination for unforgettable events, a homely
          staycation, and ideal commercial spaces!
        </p>

        {/* Login and Sign-up Buttons */}
        <div className="mx-auto mb-12 flex max-w-sm content-center space-x-4">
          <a
            href="/dashboard"
            className="block w-full rounded-full bg-primary-100 px-6 py-3 font-bold text-secondary-900 transition-colors hover:bg-primary-200"
          >
            Login
          </a>
          <a
            href="/sign-up"
            className="block w-full rounded-full bg-primary-100 px-6 py-3 font-bold text-secondary-900 transition-colors hover:bg-primary-200"
          >
            Sign-up
          </a>
        </div>

        {/* About Us Section */}
        <div className="mx-auto max-w-lg p-6">
          {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            About Us
          </h2> */}
          <h1 className="mb-6 text-4xl font-semibold">About Us</h1>
          <p className="mb-1 flex items-start text-sm font-normal">
            <div>
              <HouseIcon className="mr-3 mt-1 text-2xl text-primary-200" />
            </div>
            <span className="text-start">
              Block 11 Lot 9, 11, 13 Greenbreeze Avenue, Greenbreeze Village 1,
              Barangay Langkaan 2, Dasmariñas, Philippines, 4114
            </span>
          </p>
          <p className="mb-2 flex items-center text-sm font-normal">
            <Mail className="mr-2 text-primary-200" />
            {/* Email: */}
            <a
              href="mailto:blissnflaircommercialbuilding@gmail.com"
              className="ml-1 font-normal underline hover:text-primary-200"
            >
              blissnflaircommercialbuilding@gmail.com
            </a>
          </p>
          <p className="mb-2 flex items-center text-sm font-normal">
            <Phone className="mr-2 text-primary-200" />
            {/* Phone: */}
            <span className="ml-1 font-normal">0917-422-2807</span>
          </p>
          <p className="mb-S flex items-center text-sm font-normal">
            <Facebook className="text-primary-200" />
            <a
              href="https://www.facebook.com/profile.php?id=61555826162270"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 font-normal underline hover:text-primary-200"
            >
              Bliss & Flair Commercial Building
            </a>
          </p>
          <p className="mt-4 text-sm">
            &copy; {new Date().getFullYear()} Bliss and Flair. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
