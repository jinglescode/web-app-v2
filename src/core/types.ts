import { JobItems, PostItems } from '../design-system/pages/search/search.types';

export type UserType = 'users' | 'organizations';

export type UserIdentityMeta = {
  address: string;
  city: string;
  country: string;
  email: string;
  id: string;
  image: string;
  name: string;
  shortname: string;
  status: string;
};

export type IdentityReq = {
  created_at: string;
  current: boolean;
  id: string;
  primary: boolean;
  type: 'organizations' | 'users';
  meta: {
    address: string;
    city: string;
    country: string;
    email: string;
    id: string;
    image?: string;
    avatar?: string;
    name: string;
    shortname: string;
    status: string;
  };
};

export type SummaryReq = {
  items: {
    id: string;
    name: string;
    unread_count: string;
    updated_at: string;
    last_message: {
      text: string;
    };
  }[];
};

export type MessagesReq = {
  chat_id: string;
  created_at: string;
  deleted_at: string;
  id: string;
  identity_id: string;
  media: string;
  media_url: string;
  replied: boolean;
  reply_id: string;
  text: string;
  updated_at: string;
};

export type IdentityMeta = {
  address: string;
  avatar: string;
  image?: string;
  city: string;
  country: string;
  email: string;
  id: string;
  name: string;
  status: string;
  username: string;
};

export type ParticipantsReq = {
  all_read: boolean;
  chat_id: string;
  created_at: string;
  id: string;
  identity_id: string;
  identity_meta: IdentityMeta;
  identity_type: 'organizations' | 'users';
  joined_by: string;
  last_read_at: string;
  last_read_id: string;
  muted_until: string;
  type: string;
  updated_at: string;
};

export type FollowingsReq = {
  id: string;
  identity_id: string;
  identity_type: 'users' | 'organizations';
  mutual: boolean;
  identity_meta: IdentityMeta;
  following: boolean;
  created_at: string;
};

export type Pagination<T> = {
  items: T;
  limit: number;
  page: number;
  total_count: number;
};

export type PostMessagePayload = { id: string; text: string };

export type PostMessageResp = {
  chat_id: string;
  created_at: string;
  deleted_at: string;
  id: string;
  identity_id: string;
  media: string;
  replied: boolean;
  reply_id: string;
  text: string;
  updated_at: string;
};

export type GetJobs = {
  id: string;
  applicants: number;
  causes_tags: string[];
  title: string;
  status: 'ACTIVE' | 'DRAFT';
  updated_at: string;
};

export type CategoriesResp = {
  categories: {
    created_at: string;
    hourly_wage_dollars: number;
    id: string;
    name: string;
    updated_at: string;
  }[];
};

export type QuestionsRes = {
  created_at: string;
  id: string;
  old_id: number;
  options: null | string[];
  project_id: string;
  question: string;
  required: boolean;
  updated_at: string;
};

export type Cities = {
  country_code: string;
  id: number;
  name: string;
  population: number;
  region_id: string;
  region_iso: string;
  region_name: string;
  subregion_id: string;
  subregion_iso: string;
  subregion_name: string;
  type: string;
};

export type LikeResp = {
  comment_id: string;
  created_at: string;
  id: string;
  identity_id: string;
  post_id: string;
};

export type SearchReq = Pagination<JobItems[]> | Pagination<PostItems[]>;