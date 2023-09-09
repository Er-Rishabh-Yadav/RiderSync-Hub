"use client";

import React from "react";
import { Card } from "@/component/card/card";
import Navbar from "@/component/Navbar/navbar"
export default function Community() {
  const data = [
    // {
    //   title: "Lemon",
    //   subtitle: "This is a really tasty fruit.",
    //   emoji: "🍋",
    //   buttonText: "Order now",
    // },
    {
      title: "Rjit Riders",
      subtitle: "Join us into the Rjit campus!",
      emoji: "🏍",
      buttonText: "Book seat",
    },
    // {
    //   title: "Doggy",
    //   subtitle: "Hello, do you want to be friends?",
    //   emoji: "🐶",
    //   buttonText: "Book seat",
    // },
  ];

  const generateRandomColor = () => {
    // Define your themes in an array
    const themes = [
    //   {
    //     titleColor: "#166F39",
    //     subtitleColor: "#000000",
    //     textColor: "#166F39",
    //     primary: "#8CFFBA",
    //     secondary: "#CFFFE2",
    //     buttonColor: "#FCED84",
    //     buttonTextColor: "#000000",
    //   },
      {
        titleColor: "#0B0C11",
        subtitleColor: "#0B0C11",
        textColor: "#0B0C11",
        primary: "#A6CFE2",
        secondary: "#C2DCE9",
        buttonColor: "#0B0C11",
        buttonTextColor: "#FFD600",
      },
    //   {
    //     titleColor: "#502F7E",
    //     subtitleColor: "#502F7E",
    //     textColor: "#0B0C11",
    //     primary: "#EEB200",
    //     secondary: "#FFE086",
    //     buttonColor: "#FFFFFF",
    //     buttonTextColor: "#502F7E",
    //   },
    ];

    // Generate a random index to select a theme
    const randomIndex = Math.floor(Math.random() * themes.length);

    // Return the selected theme
    return themes[randomIndex];
  };

  const renderCards = () => {
    return data.slice(0, 1).map((item, index) => {
      const theme = generateRandomColor(); // Generate a theme for the card

      return (
        <Card
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          emoji={item.emoji}
          titleColor={theme.titleColor}
          subtitleColor={theme.subtitleColor}
          textColor={theme.textColor}
          primary={theme.primary}
          secondary={theme.secondary}
          buttonColor={theme.buttonColor}
          buttonTextColor={theme.buttonTextColor}
          buttonText={'Join Us'}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#1e293b] ">
        <div>
        {Navbar()}

        </div>
        {/* cards */}
    <section className="text-align-center flex justify-around">
      {renderCards()}
    </section>
    {/* button to create community */}
    
    {/* footer */}
    </div>
  );
}
