import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "../store/actions/authActions";
import type { RootState } from "../store/store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutSuccess()); // Clear Redux state
    navigate("/login");
  };
  return (
    <nav className=" flex w-[97%] h-[65px] sticky right-0 align-center py-[10px]  ">
      <div className="header w-[98%] flex flex-row justify-between    text-[14px]  ml-[40px] ">
        <div className=" w-[70%] h-[45px] flex flex-row    ">
          <input
            className={`border-1 border-black bg-[#050505] rounded-md font-[600] pl-1 w-[40%]  shadow-sm shadow-white hidden md:block`}
            placeholder="Search OpenSea"
          />
        </div>
        <div className=" flex flex-row    text-[14px] gap-[15px]   ">
          {user ? (
            <>
              <span className="align-center">
                Welcome,{" "}
                <span className="text-purple-600 text-[24px] font-[600]">
                  {user.username}
                </span>{" "}
              </span>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                sx={{ borderColor: "gray" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                color="inherit"
              >
                Login
              </Button>
              <Button>
                <ShoppingCartIcon sx={{ color: "white" }} />
              </Button>{" "}
            </>
          )}
          {/* correct icon alignment*/}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
