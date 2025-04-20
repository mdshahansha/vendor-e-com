import {RefObject } from "react";

export const useDropdownPosition = (
    ref:RefObject<HTMLDivElement | null > | RefObject<HTMLDivElement>
) => {
  const getDropdownPostion=()=>{
    if(!ref.current) return {top:0, left:0};

    const rect=ref.current.getBoundingClientRect();
    const dropdownWidth=240;//wdith of dropdown (w-60 = 15rem = 240px)

    // calculate the inital positon
    let left=rect.left+window.scrollX;
    let top=rect.bottom +window.scrollY;

    // check if dropwdon would go off the right edge of the viewport
    if(left+dropdownWidth > window.innerWidth){
        // align to ight edge of button instead
        left=rect.right+window.scrollX -dropdownWidth;
        // if still off-screen,align to the right edege  of viewport with some padding
        if(left<0){
            left=window.innerWidth-dropdownWidth-16;
        }
    }
    // ensure dropwdown dosent to go off left edege
    if(left<0){
        left=16;
    }
    return {top,left};
  };

  return {getDropdownPostion}

}
