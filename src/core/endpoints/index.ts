import { LoginReq, RefreshReq, ResendVerifyCode } from './../types';
import { get, post } from '../http';
import { Offer, Endpoints } from './index.types';

function getDataProp<T = unknown>(resp: { data: T }) {
  return resp.data;
}

export const endpoint: Endpoints = {
  get: {
    auth: {
      'otp/confirm': (payload) => get(`auth/otp/confirm?email=${payload.email}&code=${payload.otp}`).then(getDataProp),
    },
    projects: {
      project_id: (id: string) => get(`projects/${id}`).then(getDataProp),
      '{project_id}/offers': (payload) =>
        get(`projects/${payload.id}/offers?filter.status=${payload.status}&page=${payload.page}`).then(getDataProp),
    },
    offers: {
      offer_id: (id: string) => get(`offers/${id}`).then(getDataProp) as Promise<Offer>,
    },
    missions: {
      mission_id: (id: string) => get(`missions/${id}`).then(getDataProp),
    },
    follows: {
      followings: () => get('follows/followings').then(getDataProp),
      followers: () => get('follows/followers').then(getDataProp),
    },
  },
  post: {
    auth: {
      login: (payload: LoginReq) => post('/auth/login', payload).then(getDataProp),
      refresh: (payload: RefreshReq) => post('/auth/refresh', payload).then(getDataProp),
      'resend-verify-code': (payload: ResendVerifyCode) => post('/auth/resend-verify-code', payload).then(getDataProp),
    },
    user: {
      '{user_id}/report': (id: string, payload: { blocked: boolean; comment: string }) =>
        post(`user/${id}/report`, payload),
      '{user_id}/update_wallet': (payload: { wallet_address: string }) => post(`user/update/wallet`, payload),
      'update/profile': (payload) => post('user/update/profile', payload),
    },
    offers: {
      '{offer_id}/approve': (id: string) => post(`offers/${id}/approve`, {}).then(getDataProp),
      '{offer_id}/withdrawn': (id: string) => post(`offers/${id}/withdrawn`, {}).then(getDataProp),
      '{offer_id}/cancel': (id: string) => post(`offers/${id}/cancel`, {}).then(getDataProp),
      '{offer_id}/hire': (id: string) => post(`offers/${id}/hire`, {}).then(getDataProp),
    },
    missions: {
      '{mission_id}/complete': (id: string) => post(`missions/${id}/complete`, {}).then(getDataProp),
      '{mission_id}/cancel': (id: string) => post(`missions/${id}/cancel`, {}).then(getDataProp),
      '{mission_id}/confirm': (id: string) => post(`missions/${id}/confirm`, {}).then(getDataProp),
    },
    posts: {
      '{post_id}/report': (id: string, payload: { blocked: boolean; comment: string }) =>
        post(`posts/${id}/report`, payload).then(getDataProp),
    },
    organizations: {
      'orgs/update/{org_id}': (id, payload) => post(`/orgs/update/${id}`, payload).then(getDataProp),
    },
    payments: {
      '{offer_id/confirm}': (id: string, body: any) => post(`/payments/offers/${id}`, body).then(getDataProp),
      'add-card': (body: any) => post('/payments/cards', body).then(getDataProp),
      '{card_id}/update': (id: string, body: any) => post(`/payments/cards/update/${id}`, body).then(getDataProp),
      '{card_id}/remove': (id: string) => post(`/payments/cards/remove/${id}`, {}).then(getDataProp),
      '{mission_id}/payout': (id: string) => post(`payments/missions/${id}/payout`, {}).then(getDataProp),
    },
    follows: {
      '{identity_id}': (id: string) => post(`/follows/${id}`, {}).then(getDataProp),
      '{identity_id}/unfollow': (id: string) => post(`/follows/${id}/unfollow`, {}).then(getDataProp),
    },
    media: {
      upload: (formData) =>
        post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(getDataProp),
    },
    notifications: {
      settings_confirm: (body) => post('notifications/settings', body).then(getDataProp),
    },
  },
};
