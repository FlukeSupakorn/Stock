import React from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import InformationCard from "../../components/User/InformationCard";

function UserPayOptionPage() {
  return <div className="flex w-full">
  <div className="card w-full bg-primary card-bordered ">
    <div className="card-body">
      <h2 className="card-title flex flex-col items-start">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex font-bold text-xl">ช่องทางการชําระเงิน</div>
          <button className="btn btn-accent">เพิ่มการชําระเงิน</button>
        </div>
        <div className="divider m-0"></div>
      </h2>
      <InformationCard />
      <InformationCard />
      <InformationCard />
      <InformationCard />
      <InformationCard />
    </div>
  </div>
</div>;
}

export default () => (
  <Layout>
    <UserLayout>
      <UserPayOptionPage />
    </UserLayout>
  </Layout>
);
