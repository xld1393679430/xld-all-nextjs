import React, { useState, useCallback, useEffect } from "react";
import {
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
  message,
} from "antd";
import getConfig from "next/config";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Container from "../Container";
import { logout } from "../../store";

const { publicRuntimeConfig } = getConfig();

const { Header, Content, Footer } = Layout;
const githubIconStyle = {
  color: "#fff",
  fontSize: 40,
  display: "block",
  marginRight: 20,
};

const Index = ({ children, user, logout, router }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!searchValue) {
      message.error("请输入搜索内容");
      return;
    }
    router.push(`/search?query=${searchValue}`);
  }, [searchValue]);

  const handleLogout = useCallback(async () => {
    logout();
  }, [logout]);

  const handleOAuth = useCallback(
    (event) => {
      event.preventDefault();
      axios.get(`/prepare-auth?url=${router.asPath}`).then((res) => {
        if (res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        }
      });
    },
    [router]
  );

  useEffect(() => {
    const query = router.query && router.query.query;
    setSearchValue(query || "");
  }, [router]);

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <a>
                  <Icon type="github" style={githubIconStyle}></Icon>
                </a>
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索"
                value={searchValue}
                onChange={handleChangeSearch}
                onSearch={handleSubmit}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={handleLogout}>登出</Menu.Item>
                    </Menu>
                  }
                >
                  <Avatar size={40} src={user.avatar_url} />
                </Dropdown>
              ) : (
                <Tooltip title="点击登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Container>
          Develop by xld @{" "}
          <a href="mailto:xld139369430@outloock">xld139369430@outloock</a>{" "}
        </Container>
      </Footer>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background-color: #fff;
        }
      `}</style>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
