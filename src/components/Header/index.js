// @flow

import * as React from "react";

import logo from "../../assets/logo.svg";

import "./styles.scss";

type Props = {
  children: React.ReactNode,
};

/**
 * @function Header
 * @param {Object} props
 * @returns {React.Node}
 * @exports Header
 */

const Header = (props: Props) => {
  const { children } = props;

  return (
    <header className="Header">
      <img src={logo} alt="Kespry" />
      {children}
    </header>
  );
};

export default Header;
