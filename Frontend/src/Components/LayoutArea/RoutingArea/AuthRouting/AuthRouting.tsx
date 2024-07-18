import { Navigate, Route, Routes } from "react-router";
import "./AuthRouting.css";
import Login from "../../../AuthArea/Login/Login";
import Register from "../../../AuthArea/Register/Register";
import Layout from "../../Layout/Layout";
import Page404 from "../../page404/page404";
import { useEffect } from "react";
import { UserSlice, userActionCreators } from "../../../../Redux/UserSlice";
import { UserModel } from "../../../../Models/UserModel";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { notify } from "../../../../Utils/Notify";
import { useAppSelector } from "../../../../Redux/Store";

function getUserFromToken(token: string): UserSlice {
  const decodedToken: { exp: number; iat: number; user: UserModel } =
    jwtDecode(token);

  if (decodedToken.user && decodedToken.user.id) {
    return {
      userId: decodedToken.user.id,
      roleId: decodedToken.user.roleId,
    };
  } else {
    throw new Error("ID not found in token");
  }
}

function AuthRouting(): JSX.Element {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state?.auth);
  const roleId = useAppSelector((state) => state?.user?.roleId);

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const user = getUserFromToken(token);
        dispatch(userActionCreators.setUser(user));
      }
    } catch (err: any) {
      notify.error(err);
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="AuthRouting">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  if (!roleId) {
    return null;
  }

  return (
    <div className="AuthRouting">
      <Routes>
        <Route path="/layout/*" element={<Layout />} />
        <Route path="/error" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/layout/home" />} />
      </Routes>
    </div>
  );
}

export default AuthRouting;
