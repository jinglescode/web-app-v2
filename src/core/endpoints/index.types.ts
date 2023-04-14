export type GetProject = (id: string) => {
  applicants: number;
  applied: boolean;
  city: string;
};

export type Offer = {
  id: string;
  created_at: string;
  project_id: string;
  project: {
    id: string;
    description: string;
    title: string;
  };
  offerer: {
    meta: {
      image: string;
      name: string;
    };
  };
  recipient: {
    meta: {
      avatar: string | null;
      name: string;
    };
  };
};

type PostUserUpdatePayload = {
  bio: string;
  social_causes: string[];
  country: string;
  city: string;
  geoname_id: number;
  address: string;
  mobile_country_code: string;
  phone: string;
  cover_image: string;
  mission: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  skills: string[];
};

type PostOrganizationUpdatePayload = {
  bio: string;
  social_causes: string[];
  country: string;
  city: string;
  geoname_id: number;
  address: string;
  mobile_country_code: string;
  phone: string;
  cover_image: string;
  mission: string;
  name: string;
  type: string;
  email: string;
  culture: string;
  website: string;
  image: string;
};

export type PostMediaUploadResp = {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
};

export interface Endpoints {
  get: {};
  post: {
    auth: {};
    user: {
      '{user_id}/report': unknown;
      '{user_id}/update_wallet': unknown;
      'update/profile': (payload: PostUserUpdatePayload) => Promise<unknown>;
    };
    media: {
      upload: (formData: FormData) => Promise<PostMediaUploadResp>;
    };
    offers: {};
    missions: {};
    posts: {};
    organizations: {
      'orgs/update/{org_id}': (id: string, payload: PostOrganizationUpdatePayload) => Promise<unknown>;
    };
    payments: {};
  };
}
