import React from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";

function UserOrder() {
  return <div>UserOrder</div>;
}

export default () => (
  <Layout>
    <UserLayout>
      <UserOrder />
    </UserLayout>
  </Layout>
);
