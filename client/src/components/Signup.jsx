import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    alternatePhone: "",
    universityEmail: "",
    otp: "",
    course: "",
    batch: "",
    password: "",
    confirmPassword: "",
  });

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getOtp = async () => {
    if (!form.universityEmail.includes("@mujonline.edu.in")) {
      toast.error("Please enter a valid University Email");
      return;
    }

    try {
      const response = await axios.post("/api/users/auth/getotp", {
        universityEmail: form.universityEmail,
      });
      toast.success("OTP sent to your University Email ");
      setTimer(60);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error sending OTP");
      console.log(err);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z]+$/.test(form.firstName)) {
      toast.error("Invalid name format");
      return;
    }

    if (!form.universityEmail.includes("@mujonline.edu.in")) {
      toast.error("Please enter a valid University email");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Phone number should be exactly 10 digits");
      return;
    }

    if (form.alternatePhone && !/^\d{10}$/.test(form.alternatePhone)) {
      toast.error("Alternate phone number should be exactly 10 digits");
      return;
    }

    if (!/^\d{6}$/.test(form.otp)) {
      toast.error("OTP should be a 6-digit number");
      return;
    }

    if (!form.course) {
      toast.error("Please select a course");
      return;
    }

    if (!form.batch) {
      toast.error("Please select a batch");
      return;
    }

    if (!form.password || form.password.length < 8) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const reponse = await axios.post("/api/users/auth/signup", {
        ...form,
        name: form.firstName + form.lastName,
      });
      toast.success("Signup successfully, Signin to continue");
    } catch (err) {
      toast.error(err.response.data.message || "Please try again later");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8 relative">
        <h2 className="text-3xl font-bold mb-2">Sign up</h2>
        <p className="mb-6 text-sm">
          Already have an account?{" "}
          <span className="font-semibold cursor-pointer text-black">
            Sign in
          </span>
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={onFormSubmit}
        >
          <div>
            <label className="block text-sm mb-1">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Phone number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              minLength={10}
              required
              maxLength={10}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Alternate phone number</label>
            <input
              type="tel"
              name="alternatePhone"
              value={form.alternatePhone}
              onChange={onFormChange}
              minLength={10}
              maxLength={10}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              University mail ID<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="universityEmail"
              value={form.universityEmail}
              onChange={onFormChange}
              required
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">OTP</label>
            <div className="flex">
              <input
                type="tel"
                name="otp"
                required
                minLength={6}
                maxLength={6}
                value={form.otp}
                onChange={onFormChange}
                className="flex-1 border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent rounded-none"
              />
              <button
                type="button"
                onClick={getOtp}
                disabled={timer > 0}
                className={`px-4 rounded-r-md text-white ${
                  timer > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary hover:bg-orange-600"
                }`}
              >
                {timer > 0 ? `Retry in ${timer}s` : "Get OTP"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Select Course<span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              required
              value={form.course}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            >
              <option value="">Select</option>
              {["bca", "bba", "bcom", "mca", "mba", "mcom"].map((el) => (
                <option value={el} key={el}>
                  {el.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Select Batch<span className="text-red-500">*</span>
            </label>
            <select
              name="batch"
              required
              value={form.batch}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={onFormChange}
              className="w-full border-0 border-b border-gray-400 focus:outline-none focus:border-secondary p-2 bg-transparent"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-orange-600 text-white py-2 rounded-md text-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
