import Navbar from "../Navbar/Navbar";
import styles from "./DashboardLayout.module.css";

function DashboardLayout({
  children,
  pageTitle,
  currentPage,
  pageTitleClassName = "",
}) {
  const titleClassName = pageTitleClassName
    ? `${styles.pageTitle} ${pageTitleClassName}`
    : styles.pageTitle;

  return (
    <div className={styles.content}>
      <Navbar currentPage={currentPage}></Navbar>
      <main>
        <h1 className={titleClassName}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
