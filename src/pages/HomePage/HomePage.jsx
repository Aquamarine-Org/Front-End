import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";

function HomePage() {
  return (
    <DashboardLayout pageTitle="Início" currentPage="configurar-valvulas">
      <div>
        <h2>Bem-vindo ao Dashboard</h2>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;
