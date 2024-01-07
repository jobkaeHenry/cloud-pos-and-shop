import { Card, Typography, Stack } from "@mui/material";
import { Product } from "../interface/Products";

type MenuCardProps = {
  data: Product;
};

const MenuCard = ({ data }: MenuCardProps) => {
  const { category, title, option, price, description } = data;
  return (
    <Card
      sx={{
        height: "100%",
        p: 2,
      }}
      variant="outlined"
    >
      <Stack
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"100%"}
        textAlign={"center"}
      >
        <Stack alignItems={"center"}>
          <Typography variant="subtitle1">- {category.title} -</Typography>
          <Typography variant="h6" fontWeight={"bold"}>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </Stack>

        <Stack gap={1} flexGrow={1}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            minWidth={110}
          >
            <Typography>기본가</Typography>
            <Typography>{`${price.toLocaleString()}원`}</Typography>
          </Stack>
          {option && (
            <>
              {option.map(({ title, id, price }) => (
                <Stack
                  direction="row"
                  gap={2}
                  justifyContent={"space-between"}
                  key={id}
                >
                  <Typography>{title}</Typography>
                  <Typography>{`${price.toLocaleString()}원`}</Typography>
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default MenuCard;
