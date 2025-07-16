import {logout} from "../utils-fonctions/logout.js";
import {FaAdjust, FaCog, FaCommentDots, FaQuestionCircle, FaSignOutAlt, FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";

function Account({
                     navigate,
                     setAccessToken,
                     idUserConnected,
                     getUserById,
                     photoProfileUserConnected,
                     nomEtPrenomUserConnected,
                     setShowAccount
                 }) {

    return (
        <div>
            <div className="bg-white rounded-xl shadow-xl transition duration-200 ">
                <div className="rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.25)] p-4 mx-3 ">
                    <div className="flex items-center gap-2 mb-3">
                        {photoProfileUserConnected ?
                            <Link to={`/profile/${idUserConnected}`} onClick={() => {setShowAccount(false); getUserById(idUserConnected)}}><img
                                className="w-10 h-10 rounded-full object-cover" src={photoProfileUserConnected} alt=""/></Link> :
                            <Link to={`/profile/${idUserConnected}`}
                                  onClick={() =>{setShowAccount(false); getUserById(idUserConnected)}}><FaUserCircle
                                className="w-10 h-10 text-gray-400"/></Link>
                        }
                        <p>{nomEtPrenomUserConnected}</p>
                    </div>
                    <hr className="bg-gray-200 h-[2px] "/>
                    <p className="rounded-lg px-2 py-1 bg-gray-200 text-center">See All Profiles</p>
                </div>
                <div className="flex items-center gap-2 mx-4 mt-3">
                    <FaCog className="w-5 h-5"/>
                    <p>Settings & Privacy</p>
                </div>
                <div className="flex items-center gap-2 mx-4 mt-3">
                    <FaQuestionCircle className="w-5 h-5"/>
                    <p>Help & Support</p>
                </div>
                <div className="flex items-center gap-2 mx-4 mt-3">
                    <FaAdjust className="w-5 h-5"/>
                    <p>Display & accessibility</p>
                </div>
                <div className="flex items-center gap-2 mx-4 mt-3">
                    <FaCommentDots className="w-5 h-5"/>
                    <p>Give feedback</p>
                </div>
                <button className="flex items-center gap-2 mx-4 mt-3" onClick={() => logout(navigate, setAccessToken)}>
                    <FaSignOutAlt className="w-5 h-5"/>
                    <span>Log Out</span>
                </button>
                <p className="mx-4 mt-10 text-xs">Privacy . Terms . Advertising . Add Choices . Cookies . More . Frank @
                    2025</p>
            </div>
        </div>
    )
}

export default Account
