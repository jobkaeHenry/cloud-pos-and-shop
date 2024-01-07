interface MyInfoInterface {
  id: number;
  userId: string;
  shopName: string;
  setting?: WebsiteSetting;
}

export interface WebsiteSetting {
  id: number;
  domainName: string;
  description?: string;
  shopLogo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  shopAddress?: string;
  contact?: string;
  userId?: number;
  shopName: string;
}

export default MyInfoInterface;
