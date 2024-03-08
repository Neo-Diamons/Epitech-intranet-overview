import { Header as CarbonHeader, HeaderName, SkipToContent } from "@carbon/react";

function Header() {
  return (
    <CarbonHeader aria-label="Epitech intranet overview">
      <SkipToContent />
      <HeaderName href="#" prefix=''>
				Epitech intranet overview
      </HeaderName>
    </CarbonHeader>
  );
}

export default Header;
