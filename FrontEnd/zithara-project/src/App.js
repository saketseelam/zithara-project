import { useGetCustomerDetailsQuery } from "./store/api/customerApiSlice";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import CustomerTable from "./components/CustomerTable";
import Pagination from "./components/Pagination";
import { useEffect, useState } from "react";

function App() {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("sno");

  const {
    data: customerDetails,
    refetch,
    isLoading: loadingCustomerDetails,
  } = useGetCustomerDetailsQuery({
    page,
    sort,
    search,
  });

  useEffect(() => {
    if (loadingCustomerDetails || !customerDetails) return;
    setTotalPage(customerDetails.totalPages);
    setPage(customerDetails.currentPage);
  }, [customerDetails, loadingCustomerDetails]);

  const pageChangeHandler = (value) => {
    setPage(value);
    refetch({ search, sort, page: value });
  };

  const sortHandler = () => {
    if (sort === "sno") {
      setSort("created_at");
      refetch({ search, sort: "created_at" });
    } else {
      setSort("sno");
      refetch({ search, sort: "sno" });
    }
  };

  const searchHandler = (value) => {
    setSearch(value);
    setPage(1);
    refetch({ search: value, sort, page });
  };

  return (
    <>
      <Nav />
      {loadingCustomerDetails ? (
        <Loader />
      ) : (
        <>
          <CustomerTable
            customers={customerDetails?.customers || []}
            loadingCustomersData={loadingCustomerDetails}
            sortHandler={sortHandler}
            searchHandler={searchHandler}
          />
          <Pagination
            totalPages={totalPage}
            currentPage={page}
            pageChangeHandler={pageChangeHandler}
          />
        </>
      )}
    </>
  );
}

export default App;
