import React from "react";

interface Props {
  children: React.ReactNode;
  bg?: string;
}

const Card = ({ children, bg = "bg-gray-100" }: Props) => {
  return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;
