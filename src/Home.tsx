import Logo from "./components/icons/Logo";
function Home() {
  return (
    <div className="flex h-screen items-center justify-center px-4">
  {/* Content Wrapper */}
  <div className="w-full max-w-sm text-center">
    {/* Logo */}
    <div className="mb-6 flex justify-center">
      <Logo />
    </div>

    {/* Title */}
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      Welcome to <span className="text-primary-200">Bliss and Fair</span>
    </h1>

    {/* Subtitle */}
    <p className="text-sm text-gray-600 mb-8">
      Your ultimate destination for unforgettable events, a homely staycation, and ideal commercial spaces!
    </p>

    {/* Login Button */}
    <a
      href="/login"
      className="block w-full rounded-full bg-primary-100 px-6 py-3 font-bold text-secondary-900 hover:bg-primary-200 transition-colors"
    >
      Login
    </a>
  </div>
</div>

  
  );
}

export default Home;
