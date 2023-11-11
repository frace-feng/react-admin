import { Switch, Route } from "react-router-dom";

import Nav from "./pages/Nav/Nav";
import UserManagement from "./pages/UserManagement";
import MenuManagement from "./pages/MenuManagement";
import Counter from "./pages/Counter";
import Game from "./pages/TicTacToe/TicTacToe";
import Countdown from "./pages/CountDown/index.tsx";
import Login from "./pages/Login/index.tsx";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";

import "./App.css";
import { useSelector } from "react-redux";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "退出登录",
  },
];

function App() {
  const collapsed = useSelector((state) => state.menu.value.collapsed);
  const isAuthorized = useSelector((state) => state.login.isAuthorized);

  if (isAuthorized) {
    return (
      <div>
        <div className="header">
          <div className="global-header-container">
            <div className="global-header-logo">后台管理系统</div>
            <div style={{ flex: 1 }}></div>
            <div className="user-info">
              <div className="user-avatar-name">
                <Dropdown menu={{ items }}>
                  <Space>
                    <Avatar
                      size={32}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#f56a00" }}
                    />
                    <span
                      className="user-name"
                      onClick={(e) => e.preventDefault()}
                    >
                      frace
                    </span>
                  </Space>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="nav-side" style={{ width: collapsed ? 80 : 300 }}>
            <Nav></Nav>
          </div>
          <div className="content" style={{ marginLeft: collapsed ? 80 : 300 }}>
            <Switch>
              <Route path="/tictactoe">
                <UserManagement />
              </Route>
              <Route path="/menu">
                <MenuManagement />
              </Route>
              <Route path="/tictactoe">
                <Game />
              </Route>
              <Route path="/counter">
                <Counter />
              </Route>
              <Route path="/countDown">
                <Countdown />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="part-login">
        <Login></Login>
      </div>
    );
  }
}

function Home() {
  return <span>home</span>;
}

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//     </>
//   );
// }

export default App;
