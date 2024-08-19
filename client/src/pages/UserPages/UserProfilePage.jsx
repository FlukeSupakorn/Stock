import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserLayout from "../../components/User/UserLayout";
import axios from "axios";
import UserDataComponent from "./UserDataComponent";

const genderOptions = ["ชาย", "หญิง", "อื่นๆ"];

function UserProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState(null);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const fetchUserInfo = async () => {
    if (!userID) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3333/user/${userID}`
      );
      if (response.data.status === "ok") {
        setUserInfo(response.data.data);
        setLoading(false);
        // console.log(response.data.data);
      } else {
        console.error(
          "Error fetching user information:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleCancel = () => {
    setEditMode(false);
    fetchUserInfo();
  }

  const handleSubmit = async (event) => {
    const formData = new FormData(event.currentTarget);
    const jsonData = {
      name: formData.get("name"),
      phoneNumber: formData.get("phoneNumber"),
      gender: formData.get("gender"),
    };

    jsonData.userId = userID; // Include userId in the data
    console.log("Form Data:", jsonData);

    try {
      const response = await axios.put(
        `http://localhost:3333/user/${userID}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "ok") {
        setUserInfo((prevInfo) => ({ ...prevInfo, ...jsonData }));
        setEditMode(false);
      } else {
        console.error(
          "Error updating user information:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userID]);

  const genderCheck = (gender) => {
    if (gender === "M") {
      return "ชาย";
    } else if (gender === "F") {
      return "หญิง";
    } else {
      return "อื่นๆ";
    }
  }

  return (
    <div className="flex w-full">
      <div className="card w-full bg-primary card-bordered ">
        <div className="card-body ">
          <h2 className="card-title flex flex-col items-start">
            ข้อมูลส่วนตัว
            <div className="divider m-0"></div>
          </h2>
          {loading ? (
            <div className="flex justify-center h-24">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <UserDataComponent
                    label="ชื่อ"
                    value={userInfo[0].FirstName + " " + userInfo[0].LastName}
                    editMode={editMode}
                    name="name"
                  />
                  <UserDataComponent
                    label="อีเมล"
                    value={userInfo[0].Email}
                    editMode={false}
                    name="email"
                  />
                  <UserDataComponent
                    label="เบอร์โทรศัพท์"
                    value={userInfo[0].PhoneNumber}
                    editMode={editMode}
                    name="phoneNumber"
                  />
                  <div className="grid grid-cols-3 items-center space-y-2">
                    <div>เพศ</div>
                    <div className="col-span-2 flex flex-row space-x-4 ">
                      {genderOptions.map((option, index) => (
                        <div key={index} className="form-control">
                          <label className="label cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={option}
                              className="radio mr-4"
                              disabled={!editMode}
                              defaultChecked={option === genderCheck(userInfo[0].Gender)}
                            />
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-actions h-full justify-end content-end">
                  {editMode ? (
                    <div className="flex flex-row">
                      <button
                        className="btn btn-error mr-4"
                        type="button"
                        onClick={handleCancel}
                      >
                        ยกเลิก
                      </button>
                      <button
                        className="btn btn-accent btn-outline btn-wide"
                        type="submit"
                      >
                        บันทึก
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline btn-error btn-wide"
                      type="button"
                      onClick={toggleEditMode}
                    >
                      แก้ไข
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <UserLayout>
      <UserProfilePage />
    </UserLayout>
  </Layout>
);
