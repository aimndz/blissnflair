import { HouseIcon, Mail, Phone } from "lucide-react";
import Logo from "./components/icons/Logo";
import { Facebook } from "iconsax-react";
import Logo2 from "./components/icons/Logo2";

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-2rem)] flex-col items-center justify-center px-4">
      {/* Content Wrapper */}

      {/* Background logo */}
      <div>
        <Logo2 className="pointer-events-none fixed -bottom-36 -right-36 aspect-auto w-[800px] cursor-none opacity-20" />
      </div>

      <div className="mt-36 w-full text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo className="pointer-events-none" />
        </div>

        {/* Title */}
        <div className="mb-4 text-5xl font-semibold text-gray-800">
          <p>Welcome to </p>
          <p className="text-primary-200">
            Bliss and Flair Commercial Building
          </p>
        </div>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-lg text-sm text-gray-600">
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
            Sign up
          </a>
        </div>

        {/* About Us Section */}
        <div className="mx-auto max-w-lg">
          {/* <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            About Us
          </h2> */}
          <h1 className="mb-4 text-xl font-semibold">About Us</h1>
          <p className="mb-1 flex items-start text-sm font-normal">
            <span>
              <HouseIcon
                className="mr-3 mt-1 text-2xl text-secondary-800"
                size={20}
              />
            </span>
            <a
              href="https://maps.app.goo.gl/nMNhBdcmohAJextKA"
              target="_blank"
              className="text-start hover:text-primary-200 hover:no-underline"
            >
              <span>
                Green Breeze Village, Block 11 Lot 9, Green Breeze Ave, 1
                Langkaan 2, Dasmariñas, 4114 Cavite
              </span>
            </a>
          </p>
          <p className="mb-2 flex items-center text-sm font-normal">
            <Mail className="mr-2 text-secondary-800" size={20} />
            {/* Email: */}
            <a
              href="mailto:blissnflaircommercialbuilding@gmail.com"
              className="ml-1 font-normal hover:text-primary-200 hover:no-underline"
            >
              blissnflaircommercialbuilding@gmail.com
            </a>
          </p>
          <p className="mb-2 flex items-center text-sm font-normal">
            <Phone className="mr-2 text-secondary-800" size={20} />
            {/* Phone: */}
            <span className="ml-1 font-normal">0917-422-2807</span>
          </p>
          <p className="mb-8 flex items-center text-sm font-normal">
            <Facebook className="text-secondary-800" size={20} />
            <a
              href="https://www.facebook.com/profile.php?id=61555826162270"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 font-normal hover:text-primary-200 hover:no-underline"
            >
              Bliss & Flair Commercial Building
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
