import { useEffect } from "react";

const DynamicTitle = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = `TradeCen - ${title}`;
    }
  }, [title]);

  return null;
};

export default DynamicTitle;