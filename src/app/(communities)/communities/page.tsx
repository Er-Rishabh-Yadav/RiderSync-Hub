"use client";

// Community.tsx
import React, { useEffect, useState } from "react";
import { Card } from "@/component/card/card";
import Navbar from "@/component/Navbar/navbar";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface User {
  id: number;
  username: string;
  email: string;
  // Add other user properties as needed
}

interface CommunityData {
  _id: string;
  name: string;
  subtitle: string;
  users: User[]; // Updated to be an array of User objects
}

export default function Community() {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [myId, setMyId] = useState<string | null>(null);
  const route = useRouter();

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchCommunities = async () => {
    try {
      const response = await axios.get("/api/community/getcomm");
      const { communities, myid } = response.data;
      setCommunities(communities);
      setMyId(myid);
      route.push("/communities");
    } catch (error:any) {
      console.error(error.response?.data?.error || "Error fetching communities");
      toast.error(error.response?.data?.error || "Error fetching communities");
    }
  };

  const joinCommunity = async (id: string) => {
    try {
      await axios.post("/api/community/join", { id, myid: myId });
      toast.success("Successfully joined the community");
      fetchCommunities();
    } catch (error:any) {
      console.error(error.response?.data?.error || "Error joining the community");
      toast.error(error.response?.data?.error || "Error joining the community");
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const generateRandomColor = () => {
    const themes = [
      {
        titleColor: "#0B0C11",
        subtitleColor: "#0B0C11",
        textColor: "#0B0C11",
        primary: "#A6CFE2",
        secondary: "#C2DCE9",
        buttonColor: "#0B0C11",
        buttonTextColor: "#FFD600",
      },
    ];

    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex];
  };

  const renderCards = () => {
    return communities.map((item) => {
      const theme = generateRandomColor();

      return (
        <Card
          key={item._id}
          title={item.name}
          subtitle={item.subtitle}
          emoji="🏍"
          titleColor={theme.titleColor}
          subtitleColor={theme.subtitleColor}
          textColor={theme.textColor}
          primary={theme.primary}
          secondary={theme.secondary}
          buttonColor={theme.buttonColor}
          buttonTextColor={theme.buttonTextColor}
          buttonText="Join Us"
          users={item.users}
          id={item._id}
          myid={myId}
          joincommunity={joinCommunity}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#1e293b]">
      <div className="flex justify-items-center ">
        <Link
          className="mt-45 w-45 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
          type="button"
          href="/createcommunity"
        >
          Create Community
        </Link>
      </div>
      <section className="text-align-center flex justify-around">
        {renderCards()}
      </section>
    </div>
  );
}
