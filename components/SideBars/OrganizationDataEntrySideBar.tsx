import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsArrowRight, BsFillPersonFill, BsPhoneFill } from 'react-icons/bs';
import { FaClipboardList, FaHome, FaMap, FaSuitcase } from 'react-icons/fa';
import { HiOutlineCog, HiOutlineMailOpen } from 'react-icons/hi';
import { IoMdShare } from 'react-icons/io';
import {UserButton} from "@clerk/nextjs"

export function OrganizationDataEntrySideBar() {
    const [collapsed, setCollapsed] = useState(false);
    function handleCollapseState() {
        !collapsed ? setCollapsed(true) : setCollapsed(false);
    }

    return (
        <div className={collapsed ? 'sidebar close' : 'sidebar open'}>
            <div className="logo-details">
                <span className="logo_name">Organization Data Entry</span>
            </div>
            <ul className="nav-links">
                <li onClick={handleCollapseState}>
                    <div className="iocn-link">
                        <a href="#">
                            <BsArrowRight className="react-icon" />
                            <span className="link_name">Collapse</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Expand Side Bar
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <BsFillPersonFill className="react-icon arrow" />
                            <span className="link_name">Physical Locations</span>
                        </a>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Physical Locations
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <BsFillPersonFill className="react-icon arrow" />
                            <span className="link_name">Websites</span>
                        </a>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Websites
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-cog"></i>
                        <span className="link_name">Setting</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Setting
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <div className="profile-details">
                        <div className="profile-content"></div>
                        <div className="name-job">
                            <div className="profile_name">Prem Shahi</div>
                            <div className="job">Web Desginer</div>
                            <UserButton/>
                        </div>
                        <HiOutlineCog />
                        <BiLogOut className="react-icon" />
                    </div>
                </li>
            </ul>
        </div>
    );
}