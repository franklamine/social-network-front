import React from "react";

function MenuGaucheProfile({user, userConnected,}) {
    return (

        <div className="w-full sm:w-[40%] sm:sticky sm:top-0 sm:self-start flex flex-col gap-3 ">
            <div className="bg-white flex flex-col gap-5 p-4 ">
                <h1 className="font-semibold text-xl">Intro</h1>
                {user?.id === userConnected?.id &&
                    <button className=" bg-gray-200 w-full rounded py-1">Add bio</button>}
                <p>lives in Quebec, Quebec</p>
                {user?.id === userConnected?.id &&
                    <button className=" bg-gray-200 w-full rounded py-1">Add details</button>}
                {user?.id === userConnected?.id &&
                    <button className=" bg-gray-200 w-full rounded py-1">Add featured</button>}
            </div>

            <div className="bg-white flex justify-between p-4 ">
                <button className="font-semibold text-xl ">Photos</button>
                <a className=" ">See All photos</a>
            </div>

            <div className="bg-white p-4 h-56 ">
                <div className="flex justify-between">
                    <h1 className=" font-semibold text-xl ">Friends</h1>
                    <a className=" ">See all friends</a>
                </div>

            </div>

            <div className="bg-white p-4 h-96 ">
                <div className="flex justify-between">
                    <h1 className=" font-semibold text-xl ">Life events</h1>
                    <a className=" ">See all </a>
                </div>

            </div>

        </div>
    )
}

export default MenuGaucheProfile;