export interface ReduxAction {
  type: string;
  payload: any;
}

export interface StateRedux {
  dataCount: {
    increment: number;
  };
}
