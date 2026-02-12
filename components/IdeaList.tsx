
import React, { useState } from 'react';
import { Idea, Priority, Status } from '../types';

interface IdeaListProps {
  ideas: Idea[];
  onSelectIdea: (id: string) => void;
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onSelectIdea }) => {
  const [filter, setFilter] = useState<Status | 'Tất cả'>('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIdeas = ideas.filter(i => {
    const matchStatus = filter === 'Tất cả' || i.status === filter;
    const matchSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       i.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Nháp': return 'bg-slate-100 text-slate-600';
      case 'Chờ duyệt': return 'bg-amber-100 text-amber-700';
      case 'Đã duyệt': return 'bg-emerald-100 text-emerald-700';
      case 'Đang triển khai': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'Cao': return 'text-rose-600';
      case 'Trung bình': return 'text-amber-600';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Danh sách Sáng kiến</h2>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="text" 
            placeholder="Tìm kiếm ý tưởng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:w-64 px-4 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 rounded-xl border border-slate-200 outline-none"
          >
            <option value="Tất cả">Tất cả trạng thái</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Đã duyệt">Đã duyệt</option>
            <option value="Đang triển khai">Đang triển khai</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.length > 0 ? filteredIdeas.map(idea => (
          <div 
            key={idea.id} 
            onClick={() => onSelectIdea(idea.id)}
            className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(idea.status)}`}>
                {idea.status}
              </span>
              <span className="text-xs text-slate-400">{new Date(idea.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {idea.title}
            </h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-3 flex-1">
              {idea.description}
            </p>

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Ưu tiên:</span>
                <span className={getPriorityColor(idea.priority)}>{idea.priority}</span>
              </div>
              <span className="bg-slate-50 text-slate-500 px-2 py-1 rounded">{idea.category}</span>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center">
            <div className="text-4xl mb-4 opacity-20">📭</div>
            <p className="text-slate-500">Không tìm thấy sáng kiến nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaList;
