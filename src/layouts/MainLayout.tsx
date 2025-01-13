import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary-200 text-secondary-900">
      <div className="mx-auto max-w-4xl flex-grow">
        <main className="mx-3">
          <Outlet />
        </main>
      </div>
      <footer className="mb-3 mt-auto text-center">
        © 2025 Bliss & Flair Commercial Building. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLayout;
