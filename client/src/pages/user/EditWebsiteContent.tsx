import useMyInfoQuery from "../../features/auth/api/useMyInfoQuery";
import EditWebsite from "../../features/user/components/website/EditWebsite";
import PublishWebsiteBtn from "../../features/user/components/website/PublishWebsiteBtn";

const EditWebsiteContent = () => {
  const { data } = useMyInfoQuery();
  return data?.setting ? <EditWebsite /> : <PublishWebsiteBtn />;
};

export default EditWebsiteContent;
