import React from "react";

const ResultTable = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="py-2 px-4">URL</th>
            <th className="py-2 px-4">Performance</th>
            <th className="py-2 px-4">FCP</th>
            <th className="py-2 px-4">LCP</th>
            <th className="py-2 px-4">CLS</th>
            <th className="py-2 px-4">TBT</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4 text-blue-600 break-all">{res.url}</td>
              <td className="py-2 px-4">{res.performance}</td>
              <td className="py-2 px-4">{res.fcp}</td>
              <td className="py-2 px-4">{res.lcp}</td>
              <td className="py-2 px-4">{res.cls}</td>
              <td className="py-2 px-4">{res.tbt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
