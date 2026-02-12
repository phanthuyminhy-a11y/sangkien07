
import React, { useState } from 'react';
import { Idea, Status } from '../types';
import { refineIdea, generateIdeaImage } from '../services/geminiService';

interface IdeaDetailProps {
  idea: Idea;
  onUpdate: (idea: Idea) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const IdeaDetail: React.FC<IdeaDetailProps> = ({ idea, onUpdate, onDelete, onBack }) => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleRefine = async () => {
    setLoadingAI(true);
    try {
      const refined = await refineIdea(idea.title, idea.description);
      onUpdate({ ...idea, aiRefinement: refined });
    } catch (e) {
      console.error(e);
      alert("Lỗi khi kết nối với AI");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleGenImage = async () => {
    setLoadingImg(true);
    try {
      const imgUrl = await generateIdeaImage(idea.title, idea.description);
      if (imgUrl) {
        onUpdate({ ...idea, imageUrl: imgUrl });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingImg(false);
    }
  };

  const handleStatusChange = (newStatus: Status) => {
    onUpdate({ ...idea, status: newStatus });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium">
          ← Quay lại danh sách
        </button>
        <div className="flex gap-2">
           <button 
            onClick={() => { if(confirm('Xóa sáng kiến này?')) onDelete(idea.id); }}
            className="px-4 py-2 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">{idea.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">{idea.category}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${idea.status === 'Đã duyệt' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {idea.status}
              </span>
              <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs">
                Tác giả: {idea.author}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-l-4 border-indigo-600 pl-3">Mô tả chi tiết</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {idea.description}
              </p>
            </div>

            {idea.aiRefinement && (
              <div className="mt-12 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">✨</span>
                  <h3 className="text-lg font-bold text-indigo-900">Bản đề xuất tinh chỉnh bởi AI</h3>
                </div>
                <div className="prose prose-indigo max-w-none text-indigo-900/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {idea.aiRefinement}
                </div>
              </div>
            )}
          </div>

          {/* AI Vision Image */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Hình ảnh minh họa tầm nhìn</h3>
              {!idea.imageUrl && (
                <button 
                  onClick={handleGenImage}
                  disabled={loadingImg}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  {loadingImg ? 'Đang tạo...' : '✨ Tạo ảnh bằng AI'}
                </button>
              )}
            </div>

            {idea.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img src={idea.imageUrl} alt="AI Vision" className="w-full h-auto object-cover" />
                <button 
                  onClick={handleGenImage}
                  className="w-full py-2 bg-slate-50 text-slate-500 text-xs hover:bg-slate-100 transition-colors"
                >
                  Tạo lại hình ảnh khác
                </button>
              </div>
            ) : (
              <div className="aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 italic text-sm">
                Chưa có hình ảnh minh họa
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-800 mb-4">Thao tác phê duyệt</h3>
            
            <div className="space-y-2 mb-6">
              <button 
                onClick={() => handleStatusChange('Đã duyệt')}
                className={`w-full py-2.5 rounded-xl font-bold transition-all ${idea.status === 'Đã duyệt' ? 'bg-emerald-600 text-white' : 'border border-emerald-600 text-emerald-600 hover:bg-emerald-50'}`}
              >
                Phê duyệt
              </button>
              <button 
                onClick={() => handleStatusChange('Đang triển khai')}
                className={`w-full py-2.5 rounded-xl font-bold transition-all ${idea.status === 'Đang triển khai' ? 'bg-blue-600 text-white' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
              >
                Triển khai
              </button>
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Công cụ AI</h4>
              <button 
                onClick={handleRefine}
                disabled={loadingAI}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50"
              >
                {loadingAI ? 'Đang xử lý...' : (
                  <>
                    <span>✨</span>
                    <span>Tinh chỉnh bản thảo AI</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center px-4 leading-normal">
                AI sẽ phân tích ý tưởng của bạn và chuyển nó thành một bản đề xuất kinh doanh chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
