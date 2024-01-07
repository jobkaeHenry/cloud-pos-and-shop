import {
  AppBar,
  AppBarProps,
  Button,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { MouseEventHandler, ReactNode, memo } from "react";
import { useNavigate } from "react-router";

interface CustomAppbarInterface extends AppBarProps {
  title?: string;
  prependButton?: ReactNode;
  onClickPrepend?: MouseEventHandler<HTMLButtonElement>;

  appendButton?: ReactNode;
  disableAppend?: boolean;
  onClickAppend?: MouseEventHandler<HTMLButtonElement>;
}

const CustomAppbar = ({
  title,
  appendButton,
  prependButton,
  onClickPrepend,
  disableAppend,
  onClickAppend,
  position,
}: CustomAppbarInterface) => {
  const navigate = useNavigate();

  return (
    <AppBar sx={{ height: 64 }} position={position ? position : "fixed"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 프리팬드 버튼 */}
        {prependButton ? (
          <AppbarButton variant="text" onClick={onClickPrepend}>
            {prependButton}
          </AppbarButton>
        ) : (
          <IconButton
            onClick={(e) => (onClickPrepend ? onClickPrepend(e) : navigate(-1))}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        {/* 타이틀 */}
        <Typography component="h1" variant="subtitle2" fontWeight={"bold"}>
          {title}
        </Typography>
        {/* 어팬드 버튼 */}
        {appendButton ? (
          <AppbarButton
            disabled={disableAppend}
            onClick={onClickAppend}
            variant="text"
          >
            {appendButton}
          </AppbarButton>
        ) : (
          <div style={{ width: "40px" }} />
        )}
      </Toolbar>
    </AppBar>
  );
};
const AppbarButton = styled(Button)(() => ({
  minWidth: 40,
  fontWeight: "medium",
  fontSize: "18px",
}));

export default memo(CustomAppbar);
