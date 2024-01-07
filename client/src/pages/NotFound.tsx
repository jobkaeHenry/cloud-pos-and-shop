import { Typography, Button, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./../assets/Logo";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        minHeight: "100vh",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ width: "80%", height: "80%", p: { xs: 0, sm: 4 } }}>
        <Logo style={{ margin: "0 auto" }} />
        <Typography mt={4} variant="subtitle1" component="div" gutterBottom>
          404 : 페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="body1" gutterBottom>
          죄송합니다. 요청하신 페이지가 존재하지 않습니다.
        </Typography>
        <Button to="/" component={Link} sx={{ mt: "20px" }}>
          홈페이지로 이동
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
