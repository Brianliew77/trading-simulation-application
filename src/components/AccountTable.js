import React from "react";

function AccountTable({ account }) {
  return (
    <div className="ml-6 mt-4 w-[95%]">
      <table className="border-collapse border w-full text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-center">Account Number</th>
            <th className="border p-2 text-center">Cash Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white even:bg-gray-50">
            <td className="border p-2">{account.account_number}</td>
            <td className="border p-2">
              ${account.cash_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
