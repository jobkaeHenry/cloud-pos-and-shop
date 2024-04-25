import CardMedia from "@mui/material/CardMedia";
import RepeatComponent from "../../components/Hocs/RepeatComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Skeleton } from "@mui/material";

const ProductListSkeleton = () => {
  return (
    <ul className="grid gap-4 p-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <RepeatComponent count={7}>
        <Card>
          <CardMedia sx={{ aspectRatio: 1.2 }}>
            <div />
          </CardMedia>
          <CardContent
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap:0.5
            }}
          >
            <Skeleton width={"100%"} height={18} />
            <Skeleton width={"70%"} height={16} />
          </CardContent>
        </Card>
      </RepeatComponent>
    </ul>
  );
};

export default ProductListSkeleton;
