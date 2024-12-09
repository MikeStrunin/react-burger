import { TOrder } from "../../utils/types";

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export interface TableRow {
  id: number;
  text: string;
}

export type FeedData = TOrder;

export enum FeedActionType {
  DATA = 'data',
}

export type Data = {
  type: FeedActionType.DATA,
  data: FeedData
}

export type FeedAction = Data;

export type FeedActions = Array<FeedAction>;
