import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/my-request?page=${currentPage-1}&size=${itemsPerPage}`).then((res) => {
      // console.log(res.data);
      setMyRequest(res.data.request);
      setTotalRequest(res.data.totalRequest);
    });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()].map(e => e + 1)
  
//   console.log(myRequest);
//   console.log(totalRequest);
//   console.log(numberOfPages);

console.log(pages);

  return (
    <div>
        my request
        prev 1 2 3 next
    </div>
  )
};

export default MyRequest;
