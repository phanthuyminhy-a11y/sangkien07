
import React, { useState } from 'react';
import { Priority } from '../types';

interface IdeaFormProps {
  onSubmit: (idea: { title: string; description: string; category: string; priority: Priority; author: string }) => void;
  onCancel: () => void;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Vận hành',
    priority: 'Trung bình' as Priority,
    author: 'Người dùng hiện tại'
  });

  const categories = ['Vận hành', 'Nhân sự', 'Công nghệ', 'Khách hàng', 'Sản phẩm', 'Khác'];
  const priorities: Priority[] = ['Thấp', 'Trung bình', 'Cao'];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-xl animate-scaleIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Đề xuất Sáng kiến</h2>
        <p className="text-slate-500">Chia sẻ ý tưởng của bạn để cùng phát triển công ty.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Tiêu đề sáng kiến</label>
          <input 
            required
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="VD: Cải tiến quy trình phê duyệt nghỉ phép"
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Danh mục</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mức độ ưu tiên</label>
            <select 
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as Priority})}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Mô tả chi tiết</label>
          <textarea 
            required
            rows={5}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Nêu rõ vấn đề hiện tại và giải pháp đề xuất của bạn..."
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
          >
            Hủy bỏ
          </button>
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            Gửi đề xuất
          </button>
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;
