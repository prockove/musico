import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Box,
} from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBoxOutlined";

function PlaylistCard({ name, size }) {
  return (
    <Card
      sx={{
        backgroundColor: "#f5f5f5",
        height: "250px",
        width: "200px",
      }}
    >
      <CardContent sx={{ marginTop: "20px" }}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{size} Songs</Typography>
      </CardContent>
      <CardActions>
        <PlayIcon sx={{ fontSize: "85px" }} />
      </CardActions>
    </Card>
  );
}

export function MyPlaylists() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={"bold"}
          sx={{ marginLeft: "10%", marginBottom: "4%", marginTop: "5%" }}
        >
          My Playlists
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ marginRight: "10%" }}
        >
          <AddBoxIcon sx={{ fontSize: "60px", marginRight: "10px" }} />
          <Typography variant="h5">Create New Playlist</Typography>
        </Box>
      </div>

      <Stack direction={"row"} spacing={10} sx={{ justifyContent: "center" }}>
        <PlaylistCard name={"Upbeat Playlist"} size={58} />
        <PlaylistCard name={"Soulful Music"} size={38} />
        <PlaylistCard name={"Remix Songs"} size={25} />
        <PlaylistCard name={"Party Playlist"} size={11} />
      </Stack>
    </div>
  );
}
