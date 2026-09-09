
import { getAllTransactions } from "@/lib/api/transaction";
import TransactionsTable from "./TransactionsTable";


export default async function AdminTransactionsPage() {
  const transactions = await getAllTransactions();

  return (
    <div className="p-6">
      <div className="space-y-1 mb-4">
        <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-purple-400">
          Financial Transaction Ledger
        </h1>
        <p className="text-xs text-slate-400 font-mono">
          System Node // Monetary Log Overview
        </p>
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}