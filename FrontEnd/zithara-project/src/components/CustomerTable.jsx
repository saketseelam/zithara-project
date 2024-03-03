import React, { useState } from "react";
import {Typography} from "@material-tailwind/react"
import Loader from "./Loader";

const CustomerTable = ({
  customers,
  loadingCustomersData,
  searchHandler,
  sortHandler,
}) => {
  const [search, setSearch] = useState("");
  const classes = "p-4 border-b border-blue-gray-50 mx-20";
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="my-4 flex justify-between items-center space-x-24">
        <div className="flex items-center">
          <input
            className="border-2 border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-gray-600 rounded-r-md py-2 px-4 font-semibold text-white hover:bg-gray-400 focus:outline-none"
            onClick={(e) => searchHandler(search)}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="bg-gray-600 rounded-md py-2 px-4 font-semibold text-white hover:bg-gray-400 focus:outline-none"
            onClick={sortHandler}
          >
            Sort
          </button>
        </div>
      </div>

      <div className="border hover:shadow-md rounded-md m-auto">
        <tr className="text-xl">
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Sno</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Name</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Age</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Phone</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Location</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Date</p>
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-600 flex justify-center"
            >
              <p>Time</p>
            </Typography>
          </td>
        </tr>
        {loadingCustomersData ? (
          <Loader />
        ) : (
          customers.map((item) => {
            return (
              <tr className="font-semibold text-gray-600" key={item.sno}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    <p>{item.sno}</p>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    <p>{item.customer_name}</p>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    <p>{item.age}</p>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    {item.phone}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    {item.location}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    {item.created_at.split("T")[0]}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium flex justify-center"
                  >
                    {item.created_at.split("T")[1].split(".")[0]}
                  </Typography>
                </td>
              </tr>
            );
          })
        )}
      </div>
    </div>
  );
};
export default CustomerTable;
