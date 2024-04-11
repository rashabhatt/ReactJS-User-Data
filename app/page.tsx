"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  GridCol,
  Text,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard, { User } from "./UserCard/UserCard";

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  const handleFollowToggle = (userId: number, followStatus: boolean) => {
    // Logic to update follow status in the backend or perform any other action
    console.log(`User ${userId} ${followStatus ? "followed" : "unfollowed"}`);
    console.log("user", ` ${userId}`);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid>
        {users.map((user) => (
          <GridCol key={user.id} style={{ marginBottom: "20px" }}>
            <UserCard
              user={user}
              onFollowToggle={handleFollowToggle}
              onDelete={handleDelete}
            />
          </GridCol>
        ))}
      </Grid>
    </div>
  );
}
