"use client";

import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import Link from "next/link";
const CardDiv = styled.div`
  width: 371px;
  height: 400px;
  left: 20px;
  top: 115px;
  margin: 2em;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  overflow: hidden;
`;


export const Card = ({
  id,
  buttonColor,
  buttonText,
  buttonTextColor,
  emoji,
  primary,
  secondary,
  subtitle,
  subtitleColor,
  title,
  titleColor,
  users,
  myid,
  joincommunity
}:any) => {
 const isjoined = users.includes(myid);
  if (isjoined) {
    
    return (
      <article className="card clicked-card">
        <section className="topSection" style={{ background: primary }}>
          <h1 style={{ color: titleColor }}>{title}</h1>
        </section>
        <section
          className="bottomSection"
          style={{ backgroundColor: secondary }}
        >
          <div className="text-2xl m-5 p-5" role="img">
            {subtitle} {emoji}
          </div>
          <Link className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-opacity-50" 
          href={{
            pathname:'/rides',
            query:{
              search: `${id}`
            }
        }}
          >Explore Community</Link>
        </section>
      </article>
    );
  }

  return (
    <article className="card clicked-card">
      <section className="topSection" style={{ background: primary }}>
        <h1 style={{ color: titleColor }}>{title}</h1>
        <div>{emoji}</div>
      </section>
      <section className="bottomSection" style={{ backgroundColor: secondary }}>
        <p style={{ color: subtitleColor }}>{subtitle}</p>
        <button
          className="cardButton"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={() => joincommunity(id,myid)}
        >
          {buttonText}
        </button>
      </section>
    </article>
  );
};
