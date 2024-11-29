import Logo from "./components/icons/Logo";
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
    <h1 className="text-4xl font-semibold text-gray-800 mb-4">
      Welcome to <span className="text-primary-200">Bliss and Flair</span>
    </h1>

    {/* Subtitle */}
    <p className="text-sm text-gray-600 mb-8 max-w-lg mx-auto">
      Your ultimate destination for unforgettable events, a homely staycation, and ideal commercial spaces!
    </p>

    {/* Login Button */}
    <div className="flex max-w-sm space-x-4 content-center mx-auto">
    <a href="/login"
      className="block w-full rounded-full bg-primary-100 px-6 py-3 font-bold text-secondary-900 hover:bg-primary-200 transition-colors">
      Login
    </a>
      <a href="/sign-up"
      className="block w-full rounded-full bg-primary-100 px-6 py-3 font-bold text-secondary-900 hover:bg-primary-200 transition-colors">
      Sign-up
    </a></div>
  </div>
</div>

  
  );
}

export default Home;
