import { types } from "@babel/core";

export default (
  type: string
): {
  type: string;
  run: (payload?: any) => { type: string; payload: any };
} => ({
  type,
  run(payload) {
    return { type, payload };
  },
});

// async action
const identity = (i) => i;

const REQUEST = "REQUEST";
type REQUEST = typeof REQUEST;
const SUCCESS = "SUCCESS";
type SUCCESS = typeof SUCCESS;
const FAILURE = "FAILURE";
type FAILURE = typeof FAILURE;

const statuses = [REQUEST, SUCCESS, FAILURE];

export function createAction(
  action: string,
  payloadCreator = identity
): {
  REQUEST?: string;
  SUCCESS?: string;
  FAILURE?: string;
  request?: (payload?: any) => void;
  success?: (payload?: any) => void;
  failure?: (payload?: any) => void;
} {
  const actionMethods: {
    REQUEST?: string;
    SUCCESS?: string;
    FAILURE?: string;
    request?: () => void;
    success?: () => void;
    failure?: () => void;
  } = {};

  // Allow a type prefix to be passed in
  statuses.map((status: REQUEST | SUCCESS | FAILURE): ((
    payload: any
  ) => { type: string; payload: any }) => {
    let actionType = `${action}_${status}`;
    let subAction = (payload) => ({
      type: actionType,
      payload: payloadCreator(payload),
    });

    // translate specific actionType to generic actionType
    actionMethods[status] = actionType;
    actionMethods[status.toLowerCase()] = subAction;

    return subAction;
  })[0];

  return { ...actionMethods };
}
