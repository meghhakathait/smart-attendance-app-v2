import Container from "./Container";
import CustomNavLink from "./CustomNavLink";

import Button from "../form/Button";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

const Navbar = ({ routes }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="bg-emerald-900">
      <Container>
        <div className="flex justify-between items-center">
          <div className="text-2xl">Smart Attendance App</div>
          <div className="flex items-center">
            {routes.map((route) => (
              <CustomNavLink key={route.text} to={route.url} icon={route.icon}>
                {route.text}
              </CustomNavLink>
            ))}
            {user && (
              <>
                <span>{user.name}</span>
                <Button onClick={logout}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
