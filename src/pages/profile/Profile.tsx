import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import getAxiosError from "../../utils/axiosError";
import { toast } from "react-toastify";
import { RootState } from "../../utils/appStore";
import axios from "axios";
import { BASE_URL } from "../../appConstant";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store: RootState) => store.user);

  const [email, setEmail] = useState<string>(userData.email);
  const [name, setName] = useState<string>(userData.name);
  const [age, setAge] = useState<number>(userData.age);
  const [weight, setWeight] = useState<number>(userData.weight);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/profile`,
        {
          name,
          age,
          email,
          weight,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.entity));
      toast.info("User details updated successfully", {
        toastId: "profileUpdateSuccess",
      });
    } catch (error) {
      const appError = getAxiosError(error);
      toast.error(appError.errorMessage, { toastId: "updateProfileError" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="font-bold text-3xl text-center mb-6 text-gray-800">
          Welcome {userData.name.split(" ")[0]}
        </h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-gray-700 font-medium mb-2"
          >
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default Profile;
