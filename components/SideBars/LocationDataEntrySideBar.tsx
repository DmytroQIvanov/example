import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsArrowRight, BsFillPersonFill, BsPhoneFill } from 'react-icons/bs';
import { FaClipboardList, FaHome, FaMap, FaSuitcase } from 'react-icons/fa';
import { HiOutlineCog, HiOutlineMailOpen } from 'react-icons/hi';
import { IoMdShare } from 'react-icons/io';
import {UserButton} from "@clerk/nextjs"

export function LocationDataEntrySideBar() {
    const [collapsed, setCollapsed] = useState(false);
    function handleCollapseState() {
        !collapsed ? setCollapsed(true) : setCollapsed(false);
    }

    return (
        <div className={collapsed ? 'sidebar close' : 'sidebar open'}>
            <div className="logo-details">
                <span className="logo_name">Location Data Entry</span>
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
                            <span className="link_name">Person Interactions</span>
                        </a>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Person Interactions
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <HiOutlineMailOpen className="react-icon" />
                            <span className="link_name">Electronic Addresses</span>
                        </a>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Electronic Addresses
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <IoMdShare className="react-icon" />
                            <span className="link_name">Affiliations</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Affiliations
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <FaMap className="react-icon" />
                            <span className="link_name">Locations</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Locations
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <BsPhoneFill className="react-icon" />
                            <span className="link_name">Phones</span>
                        </a>
                    </div>
                    <ul className="sub-menu">
                        <li>
                            <a className="link_name" href="#">
                                Phones
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <FaClipboardList className="react-icon" />
                            <span className="link_name">Other Names</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Other Names
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <FaHome className="react-icon" />
                            <span className="link_name">Home Address</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Home Address
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <a href="#">
                            <FaSuitcase className="react-icon" />
                            <span className="link_name">Employment</span>
                        </a>
                    </div>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Employment
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-compass"></i>
                        <span className="link_name">Employment Id History</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Employment Id History
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-compass"></i>
                        <span className="link_name">Explore</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Explore
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-compass"></i>
                        <span className="link_name">Explore</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Explore
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-history"></i>
                        <span className="link_name">History</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                History
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-compass"></i>
                        <span className="link_name">Explore</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                Explore
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">
                        <i className="bx bx-history"></i>
                        <span className="link_name">History</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                History
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#">
                        <i className="bx bx-history"></i>
                        <span className="link_name">History</span>
                    </a>
                    <ul className="sub-menu blank">
                        <li>
                            <a className="link_name" href="#">
                                History
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
