import Navbar from "../Navbar/Navbar";
import styles from "./DashboardLayout.module.css";

function DashboardLayout({ children, pageTitle, currentPage }) {
  return (
    <div className={styles.content}>
      <Navbar currentPage={currentPage}></Navbar>
      <main>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
