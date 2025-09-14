import React,{useState,useEffect} from "react"
import Button from "../components/Button";
import InputField from "../components/InputField";

const Login = () => {
    return(
    < div className="w-[100%] h-screen flex items-center justify-center bg-[#ffffff]r">
        < div className="w-[40%] flex flex-col items-center text-[24px]  ">    
            <h2 className=" self-center text-[38px] font-[600]">Login</h2>
            <form className="w-[80%]" action=" ">
                <br />
                <label htmlFor="">Email:</label><br/>
                <InputField inputType="text"/><br/>
                <label htmlFor="">Password:</label><br/>
                <InputField inputType="password"/><br/>
                <div className="w-[100%] flex justify-center p-[5px]">
                    <Button ButtonTittle="Login"/>
                </div>
                
        
            </form>
            <Button ButtonTittle="Signup"/>
    </div>
    
    </div>
    )

}
export default Login;