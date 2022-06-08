import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsArrowRight, BsFillPersonFill, BsPhoneFill } from "react-icons/bs";
import { FaClipboardList, FaHome, FaMap, FaSuitcase } from "react-icons/fa";
import { HiOutlineCog, HiOutlineMailOpen } from "react-icons/hi";
import { IoMdShare } from "react-icons/io";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

const SideBar:React.FC<{options:{link:string,icon:JSX.Element,text:string}[],title:string}>=({options,title})=> {
    const [collapsed, setCollapsed] = useState(false);
    function handleCollapseState() {
        !collapsed ? setCollapsed(true) : setCollapsed(false);
    }

    const router = useRouter();
    const goTo = (e: any, href: string) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <div className={collapsed ? "sidebar close" : "sidebar open"}>
            <div className="logo-details">
                <span className="logo_name" >{title}</span>
            </div>
            <div className="menulist-container">
                <ul className="nav-links disable-scrollbar">
                    <li onClick={handleCollapseState} className={"disable-select"}>
                        <div className="iocn-link">
                            <a href="#">
                                <BsArrowRight className="react-icon arrow disable-select" />
                                <span className="link_name">Collapse</span>
                            </a>
                        </div>
                        <div className="sub-menu blank">
                            <li>
                                <a className="link_name" href="#">
                                    Expand Side Bar
                                </a>
                            </li>
                        </div>
                    </li>
                    {options.map((elem, index) => (
                        <li className={"disable-select list-element"} key={index}>
                            <div className="iocn-link">
                                <a onClick={(e) => goTo(e, elem.link)}>
                                    <div className={"disable-select"}>{elem.icon}</div>
                                    <span className="link_name">{elem.text}</span>
                                </a>
                                <div className="sub-menu">
                                    <div>
                                        <a className="link_name" href="#">
                                            {elem.text}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="profile-details">
                <div className="profile-content"></div>
                <div className="name-job">
                    <div className="profile_name">Alberto Aguilera</div>
                    <UserButton />
                </div>
                <HiOutlineCog />
                <BiLogOut className="react-icon" />
            </div>
        </div>
    );
}

export default SideBar;