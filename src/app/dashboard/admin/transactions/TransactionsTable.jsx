"use client";

import React from "react";
import { DollarSign, Mail, Calendar, Hash } from "lucide-react";

export default function TransactionsTable({ transactions = [] }) {
  return (
    <div className="bg-[#09090f] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      {transactions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-slate-500 font-mono">
            No transactions found.
          </p>
        </div>
      ) : (
        /* 🛠️ স্ট্যান্ডার্ড এইচটিএমএল টেবিল উইথ রেসপন্সিভ স্ক্রোল র‍্যাপার */
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="text-slate-400 font-semibold text-xs py-4 px-6">
                  Customer Email
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Amount
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Stripe Session
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-4">
                  Status
                </th>
                <th className="text-slate-400 font-semibold text-xs py-4 px-6">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                // Standardize ID string safely for React array key mapping
                const rowId = tx._id?.$oid || tx._id || Math.random().toString();

                return (
                  <tr 
                    key={rowId} 
                    className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors"
                  >
                    {/* Customer Email Cell */}
                    <td className="py-4 px-6 text-slate-300 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 text-slate-500" /> 
                        <span>{tx.userEmail}</span>
                      </div>
                    </td>

                    {/* Amount Cell */}
                    <td className="py-4 px-4 text-emerald-400 font-bold font-mono text-sm">
                      <div className="flex items-center">
                        <DollarSign className="size-3.5" /> 
                        <span>{tx.amount}</span>
                      </div>
                    </td>

                    {/* Stripe Session Cell */}
                    <td className="py-4 px-4 text-slate-500 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Hash className="size-3.5" /> 
                        <span>{tx.stripeSessionId ? `${tx.stripeSessionId.slice(0, 14)}...` : "N/A"}</span>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="py-4 px-4">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {tx.paymentStatus || "unknown"}
                        </span>
                      </div>
                    </td>

                    {/* Date Cell */}
                    <td className="py-4 px-6 text-slate-400 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" /> 
                        <span>
                          {tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString() : "N/A"}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}