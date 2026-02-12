
import React from 'react';
import { Idea } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  ideas: Idea[];
  onViewList: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ ideas, onViewList }) => {
  const stats = {
    total: ideas.length,
    pending: ideas.filter(i => i.status === 'Chờ duyệt').length,
    approved: ideas.filter(i => i.status === 'Đã duyệt').length,
    implementing: ideas.filter(i => i.status === 'Đang triển khai').length,
  };

  const categoryData = ideas.reduce((acc: any[], idea) => {
    const found = acc.find(a => a.name === idea.category);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: idea.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Chào mừng trở lại!</h2>
          <p className="text-slate-500 mt-1">Dưới đây là tình hình các sáng kiến đang hoạt động.</p>
        </div>
        <button 
          onClick={onViewList}
          className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
        >
          Xem toàn bộ danh sách →
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Tổng số sáng kiến', value: stats.total, color: 'indigo', icon: '💡' },
          { label: 'Chờ phê duyệt', value: stats.pending, color: 'amber', icon: '⏳' },
          { label: 'Đã phê duyệt', value: stats.approved, color: 'emerald', icon: '✅' },
          { label: 'Đang triển khai', value: stats.implementing, color: 'blue', icon: '🚀' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{item.icon}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold uppercase bg-${item.color}-50 text-${item.color}-600`}>
                Live
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800">{item.value}</div>
            <div className="text-sm text-slate-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Charts & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Sáng kiến theo Danh mục</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Gợi ý từ AI</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-6">
              "Phần lớn các sáng kiến gần đây tập trung vào 'Vận hành'. Có lẽ doanh nghiệp nên khuyến khích thêm các ý tưởng về 'Chăm sóc khách hàng' và 'Trải nghiệm số' để cân bằng chiến lược."
            </p>
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 text-xs">
                ✨ Tip: Sử dụng tính năng "Tinh chỉnh AI" để làm đẹp bản đề xuất của bạn.
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
