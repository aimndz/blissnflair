import Logo from "./icons/Logo";

function Loading() {
  return (
    <div className="flex h-[calc(100vh-250px)] w-full animate-pulse flex-col items-center justify-center gap-3">
      <Logo className="w-20" />
      <p className="-mt-1 text-3xl font-semibold">Loading</p>
      <p className="-mt-3">Hang on, getting your event place ready!</p>
    </div>
  );
}

export default Loading;
