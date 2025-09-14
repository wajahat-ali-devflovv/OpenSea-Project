import React from "react"
interface InputProps{
    inputType: string;
    
}

const InputField = (props :InputProps) => {
    return(
    <>
    <input className={`border-1 border-black rounded-md pl-1 w-[95%]`} type={`${props.inputType}`} required/>
    </>
    )

}
export default InputField;