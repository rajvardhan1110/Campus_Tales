import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [filter, setFilter] = useState({
    studentName: "",
    companyName: "",
    type: "",
    year: "",
    branch: "",
    passoutYear: "",
    placementType: "",
    status: "",
    date: "",
  });

  const token = localStorage.getItem("token");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();

  const branches = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical",
    "Electronics",
    "Computer Science Engineering",
    "Information Technology",
    "Robotics",
    "AI/ML",
  ];

  const passoutYears = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 10; i <= currentYear + 4; i++) {
    passoutYears.push(i.toString());
  }

  const fetchExperiences = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/experience/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
    fetchAnalytics();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredExperiences = experiences.filter((exp) => {
    const matchesStudent = filter.studentName
      ? exp.student.name.toLowerCase().includes(filter.studentName.toLowerCase())
      : true;
    const matchesCompany = filter.companyName
      ? exp.companyName.toLowerCase().includes(filter.companyName.toLowerCase())
      : true;
    const matchesType = filter.type ? exp.type === filter.type : true;
    const matchesYear = filter.year ? exp.student.year === filter.year : true;
    const matchesBranch = filter.branch ? exp.branch === filter.branch : true;
    const matchesPassout = filter.passoutYear ? exp.passoutYear === filter.passoutYear : true;
    const matchesPlacement = filter.placementType ? exp.placementType === filter.placementType : true;
    const matchesStatus = filter.status ? exp.status === filter.status : true;
    const matchesDate = filter.date
      ? new Date(exp.createdAt).toLocaleDateString() ===
        new Date(filter.date).toLocaleDateString()
      : true;

    return (
      matchesStudent &&
      matchesCompany &&
      matchesType &&
      matchesYear &&
      matchesBranch &&
      matchesPassout &&
      matchesPlacement &&
      matchesStatus &&
      matchesDate
    );
  });

  return (
    <div className="flex h-screen text-gray-800 bg-gray-100 dark:bg-gray-700">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        {/* Analytics */}
        <div className="p-5 flex flex-wrap justify-center items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
          {["Total Users", "Total Posts", "Approved", "Pending", "Rejected"].map((title, idx) => (
            <div
              key={idx}
              className="p-4 bg-white text-black rounded shadow flex flex-col items-center justify-center font-bold text-lg min-w-[120px]"
            >
              <span>{title}</span>
              <span>{[
                analytics.totalUsers,
                analytics.totalExperiences,
                analytics.totalApproved,
                analytics.totalPending,
                analytics.totalRejected,
              ][idx] || 0}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
{/* Search Inputs */}
<div className="p-5 flex justify-center items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
  <input
    name="studentName"
    placeholder="Search Student Name"
    value={filter.studentName}
    onChange={handleFilterChange}
    className="border p-2 rounded min-w-[180px]"
  />
  <input
    name="companyName"
    placeholder="Search Company Name"
    value={filter.companyName}
    onChange={handleFilterChange}
    className="border p-2 rounded min-w-[180px]"
  />
</div>

{/* Dropdown Filters */}
<div className="p-5 flex flex-wrap justify-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-lg shadow-md">
  <select
    name="type"
    value={filter.type}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Types</option>
    <option value="Internship">Internship</option>
    <option value="PPO">PPO</option>
    <option value="Internship+Placement">Internship+Placement</option>
  </select>
  <select
    name="year"
    value={filter.year}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Years</option>
    <option value="1st">1st</option>
    <option value="2nd">2nd</option>
    <option value="3rd">3rd</option>
    <option value="4th">4th</option>
  </select>
  <select
    name="branch"
    value={filter.branch}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Branches</option>
    {branches.map((b) => (
      <option key={b} value={b}>{b}</option>
    ))}
  </select>
  <select
    name="passoutYear"
    value={filter.passoutYear}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Passout Years</option>
    {passoutYears.map((y) => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>
  <select
    name="placementType"
    value={filter.placementType}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Placement Type</option>
    <option value="On-Campus">On-Campus</option>
    <option value="Off-Campus">Off-Campus</option>
  </select>
  <select
    name="status"
    value={filter.status}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  >
    <option value="">All Status</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>
  <input
    type="date"
    name="date"
    value={filter.date}
    onChange={handleFilterChange}
    className="border p-2 rounded"
  />
</div>

        {/* Experiences List */}
        <div className="p-5 flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.length === 0 ? (
  <div className="flex items-center justify-center col-span-full h-[60vh]">
    <div className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-10 py-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">No Posts Found</h2>
      <p className="text-sm opacity-90">
        Try adjusting your filters or check back later.
      </p>
    </div>
  </div>
) : (
  filteredExperiences.map((post) => {
    const statusColor =
      post.status === "approved"
        ? "bg-green-100 border-green-500 text-green-800"
        : post.status === "rejected"
        ? "bg-red-100 border-red-500 text-red-800"
        : "bg-yellow-100 border-yellow-500 text-yellow-800";

    return (
      <div
        key={post._id}
        onClick={() => navigate(`/admin/experience/${post._id}`)}
        className={`p-5 rounded-lg shadow flex flex-col justify-between border-l-4 ${statusColor} cursor-pointer hover:shadow-lg hover:-translate-y-1 transition`}
      >
        <p className="text-gray-700 mb-1">
          <span className="font-semibold text-gray-800">Student:</span>{" "}
          {post.student.name} ({post.student.email})
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold text-gray-800">Branch:</span>{" "}
          {post.branch || "N/A"}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold text-gray-800">Passout Year:</span>{" "}
          {post.passoutYear || "N/A"}
        </p>
        <p className="font-bold text-xl text-indigo-600 mb-2">
          {post.companyName}
        </p>
        <p className="text-gray-700 mt-auto">
          <strong>Type:</strong> {post.type} | <strong>Year:</strong>{" "}
          {post.year || "N/A"} | <strong>Status:</strong> {post.status}
        </p>
      </div>
    );
  })
)}


          {filteredExperiences.map((post) => {
            const statusColor =
              post.status === "approved"
                ? "bg-green-100 border-green-500 text-green-800"
                : post.status === "rejected"
                ? "bg-red-100 border-red-500 text-red-800"
                : "bg-yellow-100 border-yellow-500 text-yellow-800";

            return (
              <div
                key={post._id}
                onClick={() => navigate(`/admin/experience/${post._id}`)}
                className={`p-5 rounded-lg shadow flex flex-col justify-between border-l-4 ${statusColor} cursor-pointer hover:shadow-lg hover:-translate-y-1 transition`}
              >
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-gray-800">Student:</span>{" "}
                  {post.student.name} ({post.student.email})
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-gray-800">Branch:</span> {post.branch || "N/A"}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-gray-800">Passout Year:</span> {post.passoutYear || "N/A"}
                </p>
                <p className="font-bold text-xl text-indigo-600 mb-2">{post.companyName}</p>
                <p className="text-gray-700 mt-auto">
                  <strong>Type:</strong> {post.type} | <strong>Year:</strong>{" "}
                  {post.year || "N/A"} | <strong>Status:</strong> {post.status}
                </p>
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
