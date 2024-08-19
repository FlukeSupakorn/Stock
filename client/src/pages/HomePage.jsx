import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

function HomePage() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <div>
      HomePage
      {userId}
    </div>
  );
}

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
