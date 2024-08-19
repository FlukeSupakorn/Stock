import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

function HomePage() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <div>
      <a className="btn text-xl text-primary" href="/">
            Dairy Order
      </a>
      <a className="btn text-xl text-primary" href="/">
            Stock Management
      </a>
      {/* <a className="btn btn-ghost text-xl text-primary" href="/">
            GadgetHouse
      </a> */}
    </div>
  );
}

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
