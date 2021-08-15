import React from "react";
import { writable } from "~/lib/writable";

const [useCountStore, updateCount] = writable({
  count: 0,
});

const InnerComponent: React.FunctionComponent = () => {
  const countStore = useCountStore();

  return (
    <div className="mt-5 px-3 bg-gray-50 text-gray-800 py-5 border border-gray-100 rounded-md text-sm">
      <h3 className="font-bold">Inner component</h3>
      <div className="text-sm mt-3">Count is - {countStore.count}</div>
    </div>
  );
};

export const App: React.FunctionComponent = () => {
  const countStore = useCountStore();

  const handleIncCount = React.useCallback(() => {
    updateCount((state) => ({
      count: state.count + 1,
    }));
  }, []);

  return (
    <div className="m-5 space-y-3">
      <h2 className="font-bold">Writable Demo!</h2>
      <div className="text-sm">Count is - {countStore.count}</div>
      <div>
        <button className="btn-secondary" onClick={handleIncCount}>
          Inc count
        </button>
      </div>

      <InnerComponent />
    </div>
  );
};
