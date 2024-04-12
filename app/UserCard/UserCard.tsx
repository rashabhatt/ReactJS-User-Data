import {
  Grid,
  GridCol,
  Card,
  Avatar,
  Button,
  Text,
  Group,
  Anchor,
} from "@mantine/core";
import { useState } from "react";
import styles from "./UserCard.module.css";
import {
  IconAt,
  IconPhoneCall,
  IconStar,
  IconTrash,
  IconUserMinus,
  IconUserPlus,
  IconWorld,
} from "@tabler/icons-react";

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

  const handleEmailClick = () => {
    window.open(`mailto:${user.email}`, "_blank");
  };

  return (
    <div>
      <Card shadow="sm" padding="lg" className={styles.card}>
        <Anchor
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          c="#868e96"
          style={{marginLeft:'100px'}}
        >
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
            className={styles.avatar}
          />
        </Anchor>
        <div>
          <div>
            <Text
              fw={500}
              size="lg"
              ta="center"
              style={{ marginBottom: "5px" }}
            >
              {user.name} {following && <IconStar size={14} />}
            </Text>
            <Anchor
              href={`mailto:${user.email}`}
              onClick={handleEmailClick}
              underline="hover"
              c="#868e96"
              fz="lg"
            >
              <IconAt color="#868e96" size={16} /> {user.email}
            </Anchor>
            <Group>
              <Anchor href={`tel:${user.phone}`} underline="hover" c="#868e96">
                <IconPhoneCall color="#868e96" size={16} /> {user.phone}
              </Anchor>
            </Group>
            <Anchor
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              c="#868e96"
            >
              <IconWorld color="#868e96" size={16} />
              {user.website}
            </Anchor>
          </div>
          <Group
            style={{ marginTop: "10px" }}
            className={styles.buttonsContainer}
          >
            <Button
              onClick={handleFollowToggle}
              variant={following ? "default" : "blue"}
              leftSection={
                following ? (
                  <IconUserMinus size={14} />
                ) : (
                  <IconUserPlus size={14} />
                )
              }
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
            <Button
              onClick={() => onDelete(user.id)}
              variant="outline"
              leftSection={<IconTrash size={14} />}
            >
              Delete
            </Button>
          </Group>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
