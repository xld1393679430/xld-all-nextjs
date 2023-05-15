/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from "react";
import { Model } from "@/constants/enum";

interface IUserAgentContextProps {
  userAgent: Model;
}

interface IProps {
  children: JSX.Element;
}

export const UserAgentContext = createContext<IUserAgentContextProps>({} as IUserAgentContextProps);

export const UserAgentProvider = ({ children }: IProps) => {
  const [userAgent, setUserAgent] = useState<Model>(Model.none);

  useEffect(() => {
    const checkUserAgent = () => {
      const width = document.body.offsetWidth;
      if (width < 768) {
        setUserAgent(Model.mobile);
      } else if (width >= 768 && width < 1200) {
        // ipad端
        setUserAgent(Model.ipad);
      } else if (width >= 1200) {
        // pc端
        setUserAgent(Model.pc);
      } else {
        setUserAgent(Model.none); // 增加none类型来缓冲默认类型样式切换时的视觉突变
      }
    };

    checkUserAgent();

    window.addEventListener("resize", checkUserAgent);
    return () => {
      window.removeEventListener("resize", checkUserAgent);
    };
  }, [typeof document !== "undefined" && document.body.offsetWidth]);

  return (
    <UserAgentContext.Provider value={{ userAgent }}>
        {children}
    </UserAgentContext.Provider>
  )
};
