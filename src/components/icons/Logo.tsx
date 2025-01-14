import logo from "./logo.png";

function Logo({ className }: { className?: string }) {
  return <img src={logo} alt="logo" className={className} />;
}

export default Logo;
