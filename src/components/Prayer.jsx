/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, time, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 300 }} image={image} />
      <CardContent>
        <h2
          style={{
            color: "#ffffff",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#af2e57",
            borderRadius: "9px",
          }}
        >
          {name}
        </h2>
        <Typography variant="h1" color="text.secondary">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
