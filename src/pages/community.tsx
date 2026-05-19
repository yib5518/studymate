import React, { useState } from 'react';
import { Search, ChevronDown, PenSquare } from 'lucide-react';
import Header from '../components/Header';

const CommunityPage = () => {
  // API에서 받아올 게시글 목록 상태
  const [posts, setPosts] = useState<any[]>([]); 
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      <Header />
      <main className="w-full max-w-[1280px] px-16 py-12 flex flex-col gap-6 flex-1">
        
        <div className="p-3 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex items-center gap-5">
          <div className="flex-1 relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-600" />
            </div>
            <input 
              type="text"
              placeholder="커뮤니티 게시글 검색..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-medium text-zinc-900 placeholder:text-gray-500"
            />
          </div>
          <button className="px-6 py-2 bg-sky-700 hover:bg-sky-800 transition-colors rounded-md flex items-center gap-1.5 text-white">
            <PenSquare className="w-4 h-4" />
            <span className="text-sm font-medium tracking-tight">글쓰기</span>
          </button>
        </div>

        <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
          <div className="text-base leading-6">
            <span className="text-zinc-600 font-medium">총 </span>
            <span className="text-zinc-900 font-bold">{totalCount}</span>
            <span className="text-zinc-600 font-medium">개의 게시글</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="text-zinc-600 text-xs font-medium leading-4">정렬:</span>
            <div className="flex items-center gap-1">
              <span className="text-zinc-900 text-sm font-medium tracking-tight">최신순</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* 게시글 목록 렌더링 영역 */}
        <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="py-20 flex justify-center items-center text-zinc-500">
              등록된 게시글이 없습니다.
            </div>
          ) : (
            posts.map((post, index) => (
              <div key={index} className="p-6 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-3">
                {/* 데이터 바인딩 영역 */}
              </div>
            ))
          )}
        </div>

        <div className="pt-3 flex justify-center">
          <button className="px-4 py-2 text-sky-700 text-sm font-medium tracking-tight hover:bg-stone-100 rounded-md transition-colors">
            게시글 더 보기
          </button>
        </div>

      </main>

      <footer className="w-full bg-zinc-100 border-t border-slate-300 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] p-6 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-normal">StudyMate</span>
          <span className="text-zinc-900 text-xs font-normal">© 2026 StudyMate. 전 세계 학습자들을 위한 인지적 명확성 증진.</span>
          <div className="flex gap-3">
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">개인정보 처리방침</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">이용약관</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">고객센터</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">문의하기</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;