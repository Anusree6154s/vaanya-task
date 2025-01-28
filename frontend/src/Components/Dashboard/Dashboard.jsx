import React, { useEffect, useState } from "react";
// import CarControl from '../CarControl/CarControl';
import { collection, onSnapshot } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPostsDialog from "../AddPostsDialog/AddPostsDialog";
import AdminLogin from "../AdminLogin/AdminLogin";
import EditPostsDialog from "../EditPostsDialog/EditPostsDialog";
import { db } from "../Firebase/Firebase";
import HomePage from "../../Pages/HomePage";
import PostPage from "../../Pages/PostPage";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("Dashboard");
  const [drivers, setDrivers] = useState([]);
  const [role, setRole] = useState("admin"); // State to manage login (admin or user)
  const [error, setError] = useState("");
  const [post, setPost] = useState({ title: "", body: "" });
  const [isPostAdded, setIsPostAdded] = useState(false);
  const [pageName, setPageName] = useState("Blog Website");

  const [open, setOpen] = React.useState({ edit: false, add: false });
  const handleOpenAdd = () => setOpen((prev) => ({ ...prev, add: true }));
  const handleOpenEdit = () => setOpen((prev) => ({ ...prev, edit: true }));
  const handleCloseAdd = () => setOpen((prev) => ({ ...prev, add: false }));
  const handleCloseEdit = () => setOpen((prev) => ({ ...prev, edit: false }));
  const [refresh, setRefresh] = useState(false);

  // Fetch drivers from Firestore when the component mounts
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "drivers"), (snapshot) => {
      const driversList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrivers(driversList);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Handle field click (to switch between dashboard options)
  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  // Handle login success or failure
  const handleLogin = (role, error = "") => {
    setRole(role);
    setError(error);
  };

  // Render the dashboard based on the user's role (admin or user)
  const renderDashboard = () => (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                toggleSidebar={toggleSidebar}
                handleOpenAdd={handleOpenAdd}
                pageName={pageName}
                refresh={refresh}
                setRefresh={setRefresh}
                handleOpenEdit={handleOpenEdit}
                setPost={setPost}
                isPostAdded={isPostAdded}
                setIsPostAdded={setIsPostAdded}
              />
            }
          />
          <Route
            path="/post/:id"
            element={
              <PostPage
                toggleSidebar={toggleSidebar}
                handleOpenAdd={handleOpenAdd}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      <AddPostsDialog
        handleClose={handleCloseAdd}
        open={open.add}
        setRefresh={setRefresh}
        setIsPostAdded={setIsPostAdded}
      />
      <EditPostsDialog
        handleClose={handleCloseEdit}
        open={open.edit}
        setRefresh={setRefresh}
        post={post}
      />
    </div>
  );

  // If the user is not logged in, show the login form
  if (role === null) {
    return <AdminLogin onLogin={handleLogin} error={error} />;
  }

  // If the user is logged in, show the dashboard
  return renderDashboard();
};

export default Dashboard;
