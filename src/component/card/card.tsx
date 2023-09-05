"use client";

import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";

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
  buttonColor,
  buttonText,
  buttonTextColor,
  emoji,
  primary,
  secondary,
  subtitle,
  subtitleColor,
  title,
  titleColor
}:any) => {
  const [clicked, setClicked] = useState(false);

  if (clicked) {
    return (
      <article className="card clicked-card">
        <section className="topSection" style={{ background: primary }}>
          <h1 style={{ color: titleColor }}>{title}</h1>
        </section>
        <section
          className="bottomSection"
          style={{ backgroundColor: secondary }}
        >
          <div className="emoji" role="img">
            This shown after the join of community
          </div>
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
          onClick={() => setClicked(!clicked)}
        >
          {buttonText}
        </button>
      </section>
    </article>
  );
};
