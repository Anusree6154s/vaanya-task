import React, { useState, useEffect } from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import DriverList from "../DriverList/DriverList";
import AddDriver from "../AddDriver/AddDriver";
import MapView from "../MapView/MapView";
// import CarControl from '../CarControl/CarControl';
import { db } from "../Firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import AdminLogin from "../AdminLogin/AdminLogin";
import Posts from "../Posts/Posts";
import AddPostsDialog from "../AddPostsDialog/AddPostsDialog";
import { Box, Stack } from "@mui/material";
import EditPostsDialog from "../EditPostsDialog/EditPostsDialog";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("Dashboard");
  const [drivers, setDrivers] = useState([]);
  const [role, setRole] = useState("admin"); // State to manage login (admin or user)
  const [error, setError] = useState("");
  const [post, setPost] = useState({ title: "", body: "" });
  const [isPostAdded, setIsPostAdded] = useState(false);

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
      <Navbar toggleSidebar={toggleSidebar} handleOpen={handleOpenAdd} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <SideBar
          isSidebarOpen={isSidebarOpen}
          onFieldClick={handleFieldClick}
          setIsSidebarOpen={setIsSidebarOpen}
          sx={{ flex: 0.5 }}
        />
        <Posts
          refresh={refresh}
          sx={{ flex: 1.5 }}
          setRefresh={setRefresh}
          handleOpen={handleOpenEdit}
          setPost={setPost}
          isPostAdded={isPostAdded}
          setIsPostAdded={setIsPostAdded}
        />
      </Box>

      {/* <div
        className={`sm:ml-[266px] mt-16 ${
          isSidebarOpen ? "ml-[266px]" : "ml-0"
        }`}
      >
        {role === "admin" ? (
          // Admin sees the full dashboard
          <>
            {selectedField === 'Dashboard' && <MapView role={role} />}
            {selectedField === 'Dashboard' && <MapView /> && <CarControl />}
            {selectedField === "DriverList" && <DriverList drivers={drivers} />}
            {selectedField === 'AddDriver' && <AddDriver setDrivers={setDrivers} />}
          </>
        ) : (
          // Regular user sees only 'Add Driver'
          <>
            {selectedField === 'Dashboard' && <MapView role={role} />}
            {selectedField === 'AddDriver' && <AddDriver setDrivers={setDrivers} />}
          </>
        )}
      </div> */}
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
