import React from "react";

type IProps = {
  error: string;
};

export const Alert: React.FunctionComponent<IProps> = ({ error }) => (
  <div className="p-5 m-5 border border-red-900 bg-red-50 rounded-md text-sm text-red-900">
    <div className="text-lg mb-1">Oops got an error!</div>
    <div>Error in loading the app {error}</div>
  </div>
);
