import React from "react";
import { Link } from "gatsby";
import Icon from "./icon";
import style from "../styles/menu.module.css";

const MainMenu = ({ mainMenu, mainMenuItems, isMobileMenu }) => {
  const menu = mainMenu.slice(0);
  !isMobileMenu && menu.splice(mainMenuItems);

  return menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ));
};

type SubMenuProps = {
  mainMenu?: {
    title?: string,
    path?: string
  }[],
  mainMenuItems?: number,
  onToggleSubMenu?: (...args: any[]) => any
};

const SubMenu: React.SFC<SubMenuProps> = ({
  mainMenu,
  mainMenuItems,
  onToggleSubMenu
}) => {
  const menu = mainMenu.slice(0);
  menu.splice(0, mainMenuItems);
  const items = menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ));
  return (
    <>
      {items}

      <div
        className={style.subMenuOverlay}
        role="button"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  );
};

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`;
const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`;

type MenuProps = {
  mainMenu?: {
    title?: string,
    path?: string
  }[],
  mainMenuItems?: number,
  menuMoreText?: string,
  isMobileMenuVisible?: boolean,
  isSubMenuVisible?: boolean,
  onToggleMobileMenu?: (...args: any[]) => any,
  onToggleSubMenu?: (...args: any[]) => any,
  onChangeTheme?: (...args: any[]) => any
};

export const Menu: React.SFC<MenuProps> = ({
  mainMenu,
  mainMenuItems,
  menuMoreText,
  isMobileMenuVisible,
  isSubMenuVisible,
  onToggleMobileMenu,
  onToggleSubMenu,
  onChangeTheme
}) => {
  const isSubMenu = !(mainMenuItems >= mainMenu.length) && mainMenuItems > 0;
  return (
    <>
      <div className={style.mobileMenuContainer}>
        <>
          {isMobileMenuVisible ? (
            <>
              <ul className={style.mobileMenu}>
                <MainMenu mainMenu={mainMenu} isMobileMenu />
              </ul>

              <div
                onClick={onToggleMobileMenu}
                className={style.mobileMenuOverlay}
              />
            </>
          ) : null}
          <button
            className={style.menuTrigger}
            style={{ color: "inherit" }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon style={{ cursor: "pointer" }} size={24} d={menuIcon} />
          </button>
        </>
      </div>
      <div className={style.desktopMenuContainer}>
        <ul className={style.menu}>
          <MainMenu mainMenu={mainMenu} mainMenuItems={mainMenuItems} />
          {isSubMenu ? (
            <>
              <button
                className={style.subMenuTrigger}
                onClick={onToggleSubMenu}
                type="button"
                aria-label="Menu"
              >
                {menuMoreText || "Menu"}{" "}
                <span className={style.menuArrow}>></span>
              </button>
              {isSubMenuVisible ? (
                <ul className={style.subMenu}>
                  <SubMenu
                    mainMenu={mainMenu}
                    mainMenuItems={mainMenuItems}
                    onToggleSubMenu={onToggleSubMenu}
                  />
                </ul>
              ) : null}
            </>
          ) : null}
        </ul>
      </div>
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: "pointer" }} size={24} d={toggleIcon} />
      </button>
    </>
  );
};
