import React, { useEffect, useState } from "react";

const SimpleTable = ({ titles, model, singleView }) => {

  const [column, setColumn] = useState([]);

  const modelCol = () => {
    let len = Object.keys(model[0]).length;
    let counter = 0;
    let colName = [];
    for (const key in model[0]) {
      if (counter <= len) {
        colName[counter] = key;
        counter++;
      }
    }
    setColumn(colName)
  }

  // const singleView = (item) => {
  //   console.log(item)
  // }

  useEffect(() => {
    modelCol();
  }, [])

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className=" py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {
                    titles.map((item, index) => (
                      <th scope="col" key={index} className="px-6 py-3 text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider">{item}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  model.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => singleView(item)}
                      className={index % 2 === 0 ? 'bg-gray-100 hover:bg-darkGreen' : 'bg-gray-300 hover:bg-darkGreen'}>
                      {
                        column.map((col, index) => (
                          <td key={index} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item[column[index]]}</td>
                        ))
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleTable;