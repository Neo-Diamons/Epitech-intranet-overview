import { tabs } from "webextension-polyfill";
import { Button } from "@carbon/react";
import { Launch } from "@carbon/icons-react";

function PopupPage() {
  return (
    <div className="overflow-hidden">
      <Button onClick={() => tabs.create({ url: "index.html" })}
        hasIconOnly renderIcon={Launch} iconDescription="Open the extension" kind="secondary">
          Open the extension
      </Button>
    </div>
  );
}

export default PopupPage;
