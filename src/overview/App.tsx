import { Content } from "@carbon/react";
import { Header, SideNav, Planning } from "./index";

function App() {
  return (
    <>
      <Header />
      <SideNav />
      <Content>
        <Planning />
      </Content>
    </>
  );
}

export default App;
