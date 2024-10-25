import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-secondary-200 text-secondary-900">
      <div className="mx-auto max-w-4xl">
        <main className="mx-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
