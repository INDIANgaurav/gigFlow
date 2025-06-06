import { useState, useEffect } from "react";
import login from "../assets/login.jpg";
import companyLogo from "../assets/CompanyLogo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false); // New trigger

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setShouldSubmit(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const LoginUser = async () => {
      setLoading(true);

      try {
        await axios.post(
          "http://localhost:4040/api/v1/userAuth/login",
          formData,
          {withCredentials:true}
        );

        setMessage("Login successful!");

        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error:", error);
        setMessage("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
        setShouldSubmit(false); // Reset trigger
      }
    };

    if (shouldSubmit) {
      LoginUser();
    }
  }, [shouldSubmit]);

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e4efff] to-[#f8fbff] px-4 py-8 overflow-hidden">

<div className="flex flex-col md:flex-row items-stretch justify-center max-w-5xl w-full shadow-2xl rounded-2xl overflow-hidden">

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={login}
            alt="signup"
            className="h-full w-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Form Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-8 md:rounded-r-2xl shadow-lg w-full max-w-md md:max-w-none md:w-1/2 text-white">
          <img src={companyLogo} alt="company-logo" className="mb-2" />

          <p className="text-sm text-center mb-6">
            Seamless HR operations start now!
            <br />
            Sign up
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm">Work Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your Password"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white py-2 rounded-lg transition-all`}
            >
              {loading ? "Signing up..." : "Login for free"}
            </button>
          </form>

          {message && (
            <p className="text-sm text-center mt-4 text-yellow-300">
              {message}
            </p>
          )}

          <p className="text-xs text-center mt-4">
            By clicking on Sign up, you agree to our{" "}
            <a href="#" className="text-blue-400 underline">
              Terms and Conditions
            </a>
          </p>

          <p className="text-sm text-center mt-4">
            New on Gigfloww?{" "}
            <Link to="/" className="text-blue-400 font-medium underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
