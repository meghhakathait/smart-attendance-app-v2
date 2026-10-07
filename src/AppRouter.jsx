import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import PageNotFound from "./pages/PageNotFound";
import AdminLayout from "./layouts/AdminLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherStudent from "./pages/admin/TeacherStudent";
import Classes from "./pages/admin/Classes";
import Logs from "./pages/admin/Logs";
import Class from "./pages/admin/Class";

import LeaveRequests from "./pages/teacher/LeaveRequests";
import MyClasses from "./pages/teacher/MyClasses";
import MyStudents from "./pages/teacher/MyStudents";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyAttendance from "./pages/student/MyAttendance";
import MarkAttendance from "./pages/student/MarkAttendance";
import ProtectedRoute from "./auth/ProtectedRoute";
import MyLeaves from "./pages/student/MyLeaves";
import ReviewRequests from "./pages/teacher/ReviewRequests";
import Defaulters from "./pages/teacher/Defaulters";
import DefaulterStudent from "./pages/teacher/DefaulterStudent";
import StudentDetails from "./pages/teacher/StudentDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />}></Route>
        <Route path="manage-users" element={<TeacherStudent />}></Route>
        <Route path="class/:action/:classid?" element={<Class />}></Route>
        {/* to make it optional we add ? */}
        <Route path="classes" element={<Classes />}></Route>
        <Route path="logs" element={<Logs />}></Route>
      </Route>

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />}></Route>
        <Route path="my-classes" element={<MyClasses />}></Route>
        <Route path="leave-requests" element={<LeaveRequests />}></Route>
        <Route
          path="review-requests/:classId"
          element={<ReviewRequests />}
        ></Route>
        <Route path="my-students" element={<MyStudents />}></Route>
        <Route path="defaulters" element={<Defaulters />}></Route>
        <Route
          path="defaulter-student/:classId"
          element={<DefaulterStudent />}
        ></Route>
        {/* <Route
          path="student-details/:classId/:studentId"
          element={<StudentDetails />}
        ></Route> */}
      </Route>
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />}></Route>
        <Route path="my-attendance" element={<MyAttendance />}></Route>
        <Route path="mark-attendance" element={<MarkAttendance />}></Route>
        <Route path="my-leaves" element={<MyLeaves />}></Route>
      </Route>
      <Route
        path="/attend/:tokenid"
        element={
          <ProtectedRoute role="student">
            <MarkAttendance />
          </ProtectedRoute>
        }
      ></Route>

      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/help" element={<Help />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
};

export default AppRouter;
