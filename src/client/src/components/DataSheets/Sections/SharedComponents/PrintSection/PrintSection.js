import { faPrint } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import Button from "../../../../shared/Button";

const PrintSection = () => {
  return (
    <div className="data-sheet__print-section">
      <Button
        value="Imprimer"
        buttonClasses={["data-sheet__print-button"]}
        icon={faPrint}
        callback={() => window.print()}
      />
    </div>
  );
};

export default PrintSection;
