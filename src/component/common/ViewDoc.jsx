import { useState } from "react";

import { RxCross1 } from "react-icons/rx";

const ViewDoc = ({ openViewDoc, setOpenViewDoc , DocImage }) => {


  return (
    <>
      {openViewDoc && DocImage ? (
        <>
          <div  className="bg-[#000000] bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[90%] my-6 mx-auto max-w-3xl lg:max-w-4xl">
              <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFFFFF] outline-none focus:outline-none">

                <div className="w-full flex items-center justify-end">
                    <RxCross1 
                    onClick={()=>{setOpenViewDoc(false)}}
                    className="text-2xl text-[#000000] font-bold cursor-pointer" />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                <img src={DocImage}  className="w-[200px] h-[200px] md:h-[500px] md:w-[500px]" alt="" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};


export default ViewDoc;
