"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState } from "react";
import crossIcon from "@/assets/images/crossIcon.png";
import ArrowHeadRight from "@/assets/images/arrowHeadRight.png";
import ArrowHeadLeft from "@/assets/images/arrowHeadLeft.jpeg";
import { listMenu, MobileMenuProps } from "@/Utils/data";
import "./style.scss";

const MobileMenu = (props: MobileMenuProps) => {
  const [openinnerMenu, setInnerMenu] = useState(false);
  const handleInnerMenu = () => {
    setInnerMenu((prev) => !prev);
  };
  return (
    <div className="menu-wrapper">
      <div className="menu">
        <div className="auth-btn">
          <div className="auth">
            <Link href={"/login"}>Log in</Link>
            <Link href={"/signup"}>Sign up</Link>
          </div>

          <div className="closed-menu" onClick={props.closedMenu}>
            <Image src={crossIcon} alt="cross-icon" />
          </div>
        </div>
        <div className="divider"></div>
        <div className="menu-list">
          {listMenu.map((item) => (
            <>
              <div
                className="list-item"
                onClick={handleInnerMenu}
                key={item.id}
              >
                <p>{item.title}</p>
                <Image src={ArrowHeadRight} alt="arrow-img" />
              </div>
              {openinnerMenu && (
                <motion.div className="inner-menu-wrapper" key={item.id}>
                  <div className="menu-button-wrapper">
                    <Image src={ArrowHeadLeft} alt="arrow-head-left" />

                    <p onClick={handleInnerMenu}>Menu</p>
                  </div>

                  {listMenu.map((item, id) => (
                    <div className="item-wrapper" key={id}>
                      <div className="inner-menu">
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </>
          ))}
        </div>
        <div className="divider"></div>
        <div className="menu-list">
          {listMenu.map((item) => (
            <div
              className="list-item-below"
              onClick={handleInnerMenu}
              key={item.id}
            >
              <p>{item.title}</p>
              <Image src={ArrowHeadRight} alt="arrow-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
