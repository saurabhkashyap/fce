import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { isIE } from "../../helpers/BrowserDetection";
import Config from "../../services/Config";
import LandingHeader from "../shared/LandingHeader";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  hasLandingHeader = false,
  hasSharedButton = false,
  children,
}) => {
  const isActiveMaintenanceMode = Config.get("maintenanceMode");

  return (
    <>
      {hasLandingHeader ? (
        <LandingHeader hasSharedButton={hasSharedButton} />
      ) : (
        <Header showBetaMessage={!isActiveMaintenanceMode} />
      )}
      <div className={classNames("app-container", { ie11: isIE })}>
        {children}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  hasLandingHeader: PropTypes.bool,
  hasSharedButton: PropTypes.bool,
};

export default Layout;
