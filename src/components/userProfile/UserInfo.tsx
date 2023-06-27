import { Avatar, CardHeader, Divider, Paper, Typography } from "@mui/material";
import { UserWithoutSensitiveInfo } from "../../interfaces/User";

const UserInfo: React.FC<{ user: UserWithoutSensitiveInfo }> = ({ user }) => {
  return (
    <Paper sx={{ padding: "10px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        User Info:
      </Typography>

      <CardHeader
        // de pus imaginea de la user
        avatar={<Avatar>N</Avatar>}
        title={user.firstName + " " + user.lastName}
        titleTypographyProps={{ fontSize: "16px" }}
      />
      <Divider variant="middle" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          align="center"
          variant="h6"
          sx={{ justifyContent: "center" }}
        >
          Email:
          <span style={{ fontSize: "15px" }}>{" " + user.email}</span>
        </Typography>
      </div>
      <Divider variant="middle" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          Telefon:
          <span style={{ fontSize: "15px" }}>{" " + user.phoneNumber}</span>
        </Typography>
      </div>
      {user.address && (
        <>
          <Divider variant="middle" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              Adresa:
              <span style={{ fontSize: "15px" }}>
                {` ${user.address.locality}, ${user.address.city}`}
              </span>
            </Typography>
          </div>
        </>
      )}
    </Paper>
  );
};

export default UserInfo;
