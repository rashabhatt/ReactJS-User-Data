"use client";
import { Grid, GridCol } from "@mantine/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard, { User } from "./UserCard/UserCard";
import classes from "./UserCard/UserCard.module.css";

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
    console.log(`User ${userId} ${followStatus ? "followed" : "unfollowed"}`);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Grid>
        {users.map((user) => (
          <GridCol
            key={user.id}
            span={{ xs: 12, sm: 6, md: 8, lg: 3 }}
            style={{ marginBottom: "20px" }}
          >
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
