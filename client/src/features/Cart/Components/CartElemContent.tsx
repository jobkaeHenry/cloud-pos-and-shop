import { Stack, Typography } from "@mui/material";
import { OrderedItem } from "../../../types/Orders";

interface CartElemContentInterface {
  data: OrderedItem;
  notShowQuantity?: boolean;
}

export const CartElemContent = ({
  data,
  notShowQuantity = false,
}: CartElemContentInterface) => {
  return (
    <Stack gap={2}>
      <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
        <Stack gap={1} direction={"row"}>
          <Typography fontWeight={"bold"}>{data.title}</Typography>
          <Typography>&#8361;{` ${data.price.toLocaleString()}`}</Typography>
        </Stack>
        {!notShowQuantity && <Typography>{`x ${data.quantity}`}</Typography>}
      </Stack>

      {data.option.length > 0 && (
        <Stack gap={1}>
          {data.option.map((option) => (
            <Stack
              key={option.title}
              direction={"row"}
              gap={1}
              color={"grey.500"}
            >
              <Typography className="before:content-['└'] before:mr-1">
                {option.title}
              </Typography>

              <Typography>
                &#8361; {(option.price ?? 0).toLocaleString()}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}

      <Stack>
        {`총 ${(
          (data.price +
            data.option.reduce((acc, { price }) => acc + price, 0)) *
          data.quantity
        ).toLocaleString()}원`}
      </Stack>
    </Stack>
  );
};
