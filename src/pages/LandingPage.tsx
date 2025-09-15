import React,{useState,useEffect} from "react"
import Button from "../components/Button";
import InputField from "../components/InputField";
import userIcon from "../assets/icons/icons8-user-16.png"

const LandingPage = () => {
    return(
    < div className="w-[100%] h-screen flex text-white  bg-[#000000]">
        <nav className=" flex w-[97%] h-[65px] fixed right-0 align-center py-[10px]  ">
            < div className="header w-[98%] flex flex-row justify-between    text-[14px]   ">    
            <div className=" w-[60%] h-[45px] flex flex-row    ">
                <input className={`border-1 border-black bg-[#050505] rounded-md font-[600] pl-1 w-[40%]  shadow-sm shadow-white` }
                    placeholder="Search OpenSea" />
            </div>
                <div className=" flex flex-row    text-[14px] gap-[15px]   ">
                <button className=" w-[132px] h-[40px]  text-[#ffffff] font-[500] text-[14px] rounded-[7px]  " >Connect Wallet</button>
                <a className="w-[40px] h-[40px] flex p-[5px] " href="" ><img  className="flex self-center w-[17px] h-[17px] rounded-[9px] outline-[1px] outline-white " src={userIcon} alt="" /></a>  {/* correct icon alignment*/}
            </div>
            </div>
        </nav>
    </div>
    )

}
export default LandingPage;