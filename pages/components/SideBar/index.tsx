import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

const SideBar: React.FC<{
  options: { link: string; icon: JSX.Element; text: string }[];
  title: string;
}> = ({ options, title }) => {
  const parsedItem = localStorage.getItem("SideBarState");
  let result = false;
  if (parsedItem) {
    result = Boolean(JSON.parse(parsedItem));
  }
  const [collapsed, setCollapsed] = useState(result);
  function handleCollapseState() {
    !collapsed ? setCollapsed(true) : setCollapsed(false);
  }

  const router = useRouter();
  const goTo = (e: any, href: string) => {
    e.preventDefault();
    if (router.pathname.includes("[id]")) {
      href += `/${router.query.id}`;
    }
    router.push(href);
  };

  useEffect(() => {
    localStorage.setItem("SideBarState", `${collapsed}`);
  }, [collapsed]);

  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className={collapsed ? "sidebar close" : "sidebar open"}>
      <div className="logo-details">
        <span
          className="logo_name"
          onClick={() => router.push("/persondataentry")}
        >
          {title}
        </span>
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
            <li
              className={`disable-select list-element ${
                router.pathname.includes(elem.link)
                  ? "list-element_selected"
                  : ""
              }`}
              key={elem.link}
              onClick={(e) => goTo(e, elem.link)}
            >
              <div className="iocn-link">
                <a>
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
        {/*<div className="profile-content"></div>*/}
        <div className="name-job">
          <div className="profile_name">
            {user?.firstName} {user?.lastName}
          </div>
          <UserButton />
        </div>
        {/*<HiOutlineCog />*/}
        {/*<BiLogOut className="react-icon" />*/}
      </div>
    </div>
  );
};

export default SideBar;
