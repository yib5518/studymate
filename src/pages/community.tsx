import React from 'react';
import { Search, ChevronDown, PenSquare } from 'lucide-react';
import Header from '../components/Header'; // 공통 헤더 임포트

const CommunityPage = () => {
  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      
      {/* 공통 헤더 적용 */}
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="w-full max-w-[1280px] px-16 py-12 flex flex-col gap-6 flex-1">
        
        {/* 검색 및 글쓰기 영역 */}
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

        {/* 게시글 수 & 정렬 */}
        <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
          <div className="text-base leading-6">
            <span className="text-zinc-600 font-medium">총 </span>
            <span className="text-zinc-900 font-bold">248</span>
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

        {/* 게시글 목록 */}
        <div className="flex flex-col gap-6">
          
          {/* 게시글 카드 1 */}
          <div className="p-6 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 font-bold">A</div>
              <div className="flex flex-col">
                <span className="text-zinc-900 text-sm font-medium tracking-tight">Alex Mercer</span>
                <span className="text-zinc-600 text-xs font-medium">2시간 전 • 고급 미적분학</span>
              </div>
            </div>
            <h3 className="text-sky-800 text-2xl font-medium leading-8 mt-1">
              테일러 급수 전개가 너무 어려운데, 직관적인 설명이 있을까요?
            </h3>
            <p className="text-gray-700 text-base font-normal leading-6 line-clamp-2">
              I understand the formal definition and the formula, but I'm having a hard time visualizing what exactly is happening when we add more terms to the polynomial. Does anyone have a good mental model or analogy for how a Taylor series approximates a...
            </p>
          </div>

          {/* 게시글 카드 2 */}
          <div className="p-6 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500 font-bold">S</div>
              <div className="flex flex-col">
                <span className="text-zinc-900 text-sm font-medium tracking-tight">Sarah Jenkins</span>
                <span className="text-zinc-600 text-xs font-medium">5시간 전 • 학습법</span>
              </div>
            </div>
            <h3 className="text-sky-800 text-2xl font-medium leading-8 mt-1">
              기말고사를 위한 4주 학습 계획표 - 템플릿 포함!
            </h3>
            <p className="text-gray-700 text-base font-normal leading-6 line-clamp-2">
              Hey everyone, finals are approaching fast so I thought I'd share the Notion template I use to organize my study blocks. It uses a combination of retrospective revision timetables and spaced repetition. It really helped reduce my anxiety last semester by...
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-zinc-100 rounded-xl text-gray-700 text-xs font-normal">#Productivity</span>
              <span className="px-2 py-0.5 bg-zinc-100 rounded-xl text-gray-700 text-xs font-normal">#Templates</span>
            </div>
          </div>

          {/* 게시글 카드 3 */}
          <div className="p-6 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-200 rounded-xl border border-slate-300/30 flex justify-center items-center">
                <span className="text-neutral-500 text-2xl font-bold">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-900 text-sm font-medium tracking-tight">Marcus T.</span>
                <span className="text-zinc-600 text-xs font-medium">어제 • 머신러닝</span>
              </div>
            </div>
            <h3 className="text-sky-800 text-2xl font-bold leading-8 mt-1">
              경사 하강법(SGD) vs Adam 옵티마이저 - 각각 언제 사용해야 할까요?
            </h3>
            <p className="text-gray-700 text-base font-normal leading-6 line-clamp-2">
              I'm working on a deep learning project and currently just defaulting to Adam because it seems to be the industry standard. Are there specific scenarios where plain SGD or other optimizers would actually be preferable in terms of convergence or final...
            </p>
          </div>
        </div>

        {/* 더 보기 버튼 */}
        <div className="pt-3 flex justify-center">
          <button className="px-4 py-2 text-sky-700 text-sm font-medium tracking-tight hover:bg-stone-100 rounded-md transition-colors">
            게시글 더 보기
          </button>
        </div>

      </main>

      {/* 푸터 */}
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