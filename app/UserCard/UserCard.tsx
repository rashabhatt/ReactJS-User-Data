import { Grid, GridCol, Card, Avatar, Button, Text } from "@mantine/core";
import { useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const UserCard: React.FC<{
  user: User;
  onFollowToggle: (userId: number, followStatus: boolean) => void;
  onDelete: (userId: number) => void;
}> = ({ user, onFollowToggle, onDelete }) => {
  const [following, setFollowing] = useState<boolean>(false);

  const handleFollowToggle = () => {
    setFollowing(!following);
    onFollowToggle(user.id, !following);
  };
  return (
    <div>
      <Grid>
        <GridCol>
          <Card shadow="sm" padding="lg" style={{ marginBottom: "20px" }}>
            <Avatar
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              radius="lg"
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <Text style={{ marginBottom: "5px" }}>
                  {user.name} {following && "⭐"}
                </Text>
                <Text size="sm" style={{ marginBottom: "5px" }}>
                  {user.email}
                </Text>
                <Text size="sm" style={{ marginBottom: "5px" }}>
                  {user.phone}
                </Text>
                <Text size="sm">{user.website}</Text>
              </div>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleFollowToggle}
                color={following ? "red" : "blue"}
                variant="outline"
                style={{ marginRight: "10px" }}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
              <Button
                onClick={() => onDelete(user.id)}
                color="red"
                variant="outline"
              >
                Delete
              </Button>
            </div>
          </Card>
        </GridCol>
      </Grid>
    </div>
  );
};

export default UserCard;
