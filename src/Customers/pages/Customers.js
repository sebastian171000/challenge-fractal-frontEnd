/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../shared/components/Table/Table";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fecthCustomers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/customers/?page=${page}`
        );
        setCustomers(responseData);
      } catch (error) {}
    };
    fecthCustomers();
  }, [sendRequest, page]);
  const prevButtonHandler = () => {
    if (!customers.hasPreviousPage) return;
    setPage(customers.previousPage);
  };
  const nextButtonHandler = () => {
    if (!customers.hasNextPage) return;
    setPage(customers.nextPage);
  };
  const goToStartButtonHandler = () => {
    if (!customers.hasPreviousPage) return;
    setPage(1);
  };
  const goToFinalButtonHandler = () => {
    if (!customers.hasNextPage) return;
    setPage(customers.lastPage);
  };
  const inputPagehandler = (e) => {
    if (e.target.value < 1 || e.target.value > customers.lastPage) return;
    setPage(+e.target.value);
  };
  return (
    <>
      <Link className='btnNew' to='new'>
        Add New Customer
      </Link>
      <Table data={customers.customers} />
      <div className='pagination'>
        <div>
          <span
            className={`btnPagination ${
              customers.hasPreviousPage ? "" : "btnPaginationDisable"
            }`}
            onClick={goToStartButtonHandler}>{`|<`}</span>
          <span
            className={`btnPagination ${
              customers.hasPreviousPage ? "" : "btnPaginationDisable"
            }`}
            onClick={prevButtonHandler}>{`<`}</span>
          <span>Page</span>
          <span className='currentPage'>[{customers.currentPage}]</span>
          <span>of</span>
          <span className='lastPage'>[{customers.lastPage}]</span>
          <span
            className={`btnPagination ${
              customers.hasNextPage ? "" : "btnPaginationDisable"
            }`}
            onClick={nextButtonHandler}>{`>`}</span>
          <span
            className={`btnPagination ${
              customers.hasNextPage ? "" : "btnPaginationDisable"
            }`}
            onClick={goToFinalButtonHandler}>{`>|`}</span>
        </div>
      </div>
      <div className='goToPage'>
        <label>Go to page: </label>
        <input type='text' onChange={inputPagehandler}></input>
      </div>
    </>
  );
};

export default Customers;
