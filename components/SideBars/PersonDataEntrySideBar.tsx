import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsArrowRight, BsFillPersonFill, BsPhoneFill } from 'react-icons/bs';
import { FaClipboardList, FaHome, FaMap, FaSuitcase } from 'react-icons/fa';
import { HiOutlineCog, HiOutlineMailOpen } from 'react-icons/hi';
import { IoMdShare } from 'react-icons/io';
import {UserButton} from "@clerk/nextjs";
import { useRouter } from 'next/router';

export function PersonDataEntrySideBar() {
  const [collapsed, setCollapsed] = useState(false);
  function handleCollapseState() {
    !collapsed ? setCollapsed(true) : setCollapsed(false);
  }

  const router = useRouter();
  const goTo = (e: any, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <div className={collapsed ? 'sidebar close' : 'sidebar open'}>
      <div className="logo-details">
        <span className="logo_name">Person Data Entry</span>
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
            <a onClick={(e) => goTo(e, '/persondataentry/interactions')}>
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
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/electronicaddress')}>
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
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/affiliations')}>
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
            <a onClick={(e) => goTo(e, '/persondataentry/locations')}>
              <FaMap className="react-icon" />
              <span className="link_name">Locations</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name">
                Locations
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a onClick={(e) => goTo(e, '/persondataentry/phones')}>
              <BsPhoneFill className="react-icon" />
              <span className="link_name">Phones</span>
            </a>
          </div>
          <ul className="sub-menu">
            <li>
              <a className="link_name">
                Phones
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a onClick={(e) => goTo(e, '/persondataentry/othernames')}>
              <FaClipboardList className="react-icon" />
              <span className="link_name">Other Names</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name">
                Other Names
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a onClick={(e) => goTo(e, '/persondataentry/homeaddress')}>
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
            <a onClick={(e) => goTo(e, '/persondataentry/employment')}>
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
          <div className="iocn-link">
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/employmenthistory')}>
              <FaSuitcase className="react-icon" />
              <span className="link_name">Employment Id History</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Employment Id History
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/employment')}>
              <FaSuitcase className="react-icon" />
              <span className="link_name">Submissions</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Submissions
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/employment')}>
              <FaSuitcase className="react-icon" />
              <span className="link_name">Deductions</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Deductions
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#" onClick={(e) => goTo(e, '/persondataentry/employment')}>
              <FaSuitcase className="react-icon" />
              <span className="link_name">Research</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Research
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a onClick={(e) => goTo(e, '/persondataentry/employment')}>
              <FaSuitcase className="react-icon" />
              <span className="link_name">Campuses</span>
            </a>
          </div>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Campuses
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
