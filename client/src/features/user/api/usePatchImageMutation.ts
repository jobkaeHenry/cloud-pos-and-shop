import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { UPLOAD_MENU_IMAGE } from "../../../const/serverPath";
import { axiosPrivate } from "../../../libs/axios/axios";

export const usePatchImageMutation = (
  options?: Omit<
    UseMutationOptions<
      {
        image: string;
      },
      Error,
      PostImageInterface,
      unknown
    >,
    "mutationFn"
  >
) =>
  useMutation({
    mutationFn: ({ file, menuId }: PostImageInterface) =>
      postImageFn({ file, menuId }),
    ...options,
  });

interface PostImageInterface {
  file: File;
  menuId: number;
}
export const postImageFn = async ({ file, menuId }: PostImageInterface) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosPrivate.post<{ image: string }>(
    UPLOAD_MENU_IMAGE(menuId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
      baseURL: process.env.NEXT_PUBLIC_IMAGE_COMPRESS_URL,
    }
  );
  return data;
};
