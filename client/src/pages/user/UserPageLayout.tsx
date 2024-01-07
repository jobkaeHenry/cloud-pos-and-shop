import DashboardDrawer from "../../features/user/components/DashboardDrawer";
import { Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router";

const UserPageLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardDrawer />
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Stack direction="column" gap={2}>
          <Paper sx={{ p: 4 }}>{<Outlet />}</Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserPageLayout;
