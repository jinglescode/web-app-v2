import { UserType } from 'src/core/types';

import { Media } from '../media/media.types';
import { Identity } from '../site/site.types';
import { PaginateRes } from '../types';

export interface DisputeEvent {
  id: string;
  message: string;
  type: 'MESSAGE' | 'RESPONSE' | 'WITHDRAW' | 'VOTE';
  vote_side: null;
  evidences: Media[];
}

export interface DisputeReq {
  respondent_id: string;
  title: string;
  description: string;
  evidences?: string[];
}

export interface Dispute {
  id: string;
  title: string;
  state:
    | 'AWAITING_RESPONSE'
    | 'JUROR_SELECTION'
    | 'JUROR_RESELECTION'
    | 'PENDING_REVIEW'
    | 'WITHDRAWN'
    | 'DECISION_SUBMITTED';
  code: string;
  direction: 'received' | 'submitted' | 'juror';
  claimant: Identity;
  respondent: Identity;
  events: DisputeEvent[];
  created_at: Date;
  updated_at: Date;
}

export interface DisputesRes extends PaginateRes {
  items: Dispute[];
}
