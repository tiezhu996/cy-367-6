import type { RankingItem } from "../types";

interface RankingTableProps {
  records: RankingItem[];
}

function getRankBadgeClass(rank: number): string {
  switch (rank) {
    case 1:
      return "bg-amber-500 text-white font-bold";
    case 2:
      return "bg-slate-400 text-white font-bold";
    case 3:
      return "bg-amber-700 text-white font-bold";
    default:
      return "bg-ink/10 text-ink";
  }
}

function getRowHighlightClass(rank: number): string {
  switch (rank) {
    case 1:
      return "bg-amber-500/10";
    case 2:
      return "bg-slate-400/10";
    case 3:
      return "bg-amber-700/10";
    default:
      return "";
  }
}

export function RankingTable({ records }: RankingTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-ink/5">
          <tr>
            <th className="p-3 w-20">排名</th>
            <th className="p-3">用户</th>
            <th className="p-3">今日学习时长</th>
            <th className="p-3">连续打卡</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              className={`border-t border-ink/10 transition-colors ${getRowHighlightClass(record.rank)}`}
              key={record.user_id}
            >
              <td className="p-3">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs ${getRankBadgeClass(record.rank)}`}
                >
                  {record.rank}
                </span>
              </td>
              <td className="p-3 font-medium">{record.user_name}</td>
              <td className="p-3">{record.total_hours}</td>
              <td className="p-3">
                <span className="inline-flex items-center gap-1">
                  <span className="text-accent font-semibold">{record.current_streak}</span>
                  <span className="text-ink/60">天</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
