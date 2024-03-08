import {
  SideNav as CarbonSideNav,
  SideNavItems,
  // SideNavMenu,
  // SideNavMenuItem,
  SideNavLink
} from "@carbon/react";

function SideNav() {
  return (
    <CarbonSideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation">
      <SideNavItems>
        <SideNavLink isActive={true} href="/">
					Schedule
        </SideNavLink>
      </SideNavItems>
    </CarbonSideNav>
  );
}

export default SideNav;
