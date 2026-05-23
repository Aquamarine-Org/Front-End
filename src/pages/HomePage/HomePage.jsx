import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";

function HomePage() {
  return (
    <DashboardLayout pageTitle="Início" currentPage="configurar-valvulas">
      <div>Fluxo e Pressão</div>

      <div>Válvula Principal</div>

      <div></div>
    </DashboardLayout>
  );
}

export default HomePage;
