"use client";

import React from "react";
import { DollarSign, Mail, Calendar, Hash, CheckCircle, Clock } from "lucide-react";

export default function TransactionsTable({ transactions = [] }) {
  return (
    <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950/20 max-w-full">
      {transactions.length === 0 ? (
        <div className="text-center py-16 bg-transparent">
          <p className="text-sm text-slate-400 font-mono">
            No transactions found.
          </p>
        </div>
      ) : (
        /* 🛠️ স্ট্যান্ডার্ড এইচটিএমএল টেবিল উইথ রেসপন্সিভ স্ক্রোল র‍্যাপার */
        <div className="w-full max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90">
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Customer Email
                </th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Amount
                </th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Stripe Session
                </th>
                <th className="py-4 px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Status
                </th>
                <th className="py-4 px-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-transparent">
              {transactions.map((tx, index) => {
                // Standardize ID string safely for React array key mapping
                const rowId = tx._id?.$oid || tx._id || `tx-${index}`;
                const isPaid = tx.paymentStatus?.toLowerCase() === "paid";

                return (
                  <tr
                    key={rowId}
                    className="hover:bg-cyan-950/20 transition-all duration-200 group"
                  >
                    {/* Customer Email Cell */}
                    <td className="py-4 px-6 text-slate-300 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="size-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{tx.userEmail}</span>
                      </div>
                    </td>

                    {/* Amount Cell */}
                    <td className="py-4 px-4 text-cyan-400 font-black font-mono text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.25)]">
                      <div className="flex items-center">
                        <DollarSign className="size-3.5 shrink-0" />
                        <span>{tx.amount?.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Stripe Session Cell */}
                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Hash className="size-3.5 text-cyan-400 shrink-0" />
                        <span>{tx.stripeSessionId ? `${tx.stripeSessionId.slice(0, 14)}...` : "N/A"}</span>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border font-mono whitespace-nowrap ${
                        isPaid
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}>
                        {isPaid ? <CheckCircle className="size-3" /> : <Clock className="size-3" />}
                        {tx.paymentStatus || "unknown"}
                      </span>
                    </td>

                    {/* Date Cell */}
                    <td className="py-4 px-6 text-slate-400 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-cyan-400 shrink-0" />
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