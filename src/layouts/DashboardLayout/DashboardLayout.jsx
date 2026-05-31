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
      <Navbar currentPage={currentPage} />

      <main className={styles.main}>
        {pageTitle ? (
          <header className={styles.pageHeader}>
            <h1 className={titleClassName}>{pageTitle}</h1>
          </header>
        ) : null}

        <div className={styles.pageBody}>{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
