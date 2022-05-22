import { useState } from 'react';
import { FaMap, FaUserAlt, FaRegMap } from 'react-icons/fa';
import { BsTools, BsGear } from 'react-icons/bs';
import { FiShuffle, FiUsers, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

export function AppSelection() {
  const router = useRouter();
  const goTo = (e: any, href: string) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <div className="app-selection">
      <div>
        <div className="title">App Selection</div>
        <div className="selections">
          <ul className="nav-links">
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/persondataentry/deductions')}>
                  <FaUserAlt className="react-icon" />
                  <span className="link_name">Person Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/organizationdataentry/locationsdataentry')}>
                  <FiUsers className="react-icon" />
                  <span className="link_name">Organization Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/pidataentry/locations')}>
                  <FiShuffle className="react-icon" />
                  <span className="link_name">PI Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/locationdataentry')}>
                  <FaRegMap className="react-icon" />
                  <span className="link_name">Location Data Entry</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/utilities')}>
                  <BsTools className="react-icon" />
                  <span className="link_name">Utilities</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#" onClick={(e) => goTo(e, '/settings')}>
                  <BsGear className="react-icon" />
                  <span className="link_name">Settings</span>
                </a>
              </div>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <FiLogOut className="react-icon" />
                  <span className="link_name">Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}