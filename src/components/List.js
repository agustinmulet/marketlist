import React from "react";
import { FaTrash } from "react-icons/fa";

const List = props => {
  const { list, deleteThis } = props;
  const finalList = list.length
    ? list.map(item => {
        return (
          <li key={item + Math.random()}>
            {item}
            <button className="delete" onClick={() => deleteThis(item)}>
              <FaTrash />
            </button>
          </li>
        );
      })
    : "No items in your list";
  return <ul className="list"> {finalList} </ul>;
};

export default List;
