import React, { useState, useEffect } from "react";
interface ButtonProps {
  ButtonTittle: string;
}

const ButtonComp = (props: ButtonProps) => {
  return (
    <>
      <button className=" w-[150px] h-[60px] bg-[#476EAE] text-[#ffffff] font-[500] text-[24px] rounded-[7px]  ">
        {props.ButtonTittle}
      </button>
    </>
  );
};
export default ButtonComp;
