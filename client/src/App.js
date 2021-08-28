import React, { Fragment, useState, useEffect } from "react";
import InputLink from "./components/InputLink";
import HeaderPage from "./components/HeaderPage";
import HistoryPage from "./components/HistoryPage";
import DetailPage from "./components/DetailPage";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState([]);
  const changePage = (page) => {
    setCurrentPage({ page, productId: 0 });
  }
  const goToDetailPage = (productId) => {
    setCurrentPage({ page: 'detail', productId });
  }
  useEffect(() => {
    setCurrentPage({ page: 'main', productId: 0 });
  }, []);

  return (
    <Fragment>
      <div className="container">
        <HeaderPage changePage={changePage} />
        {currentPage.page === 'main' && (
          <InputLink goToDetailPage={goToDetailPage} />
        )}
        {currentPage.page === 'history' && (
          <HistoryPage goToDetailPage={goToDetailPage} />
        )}
        {currentPage.page === 'detail' && (
          <DetailPage productId={currentPage.productId} />
        )}
      </div>
    </Fragment>
  );
}


export default App;
