import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, CheckSquare, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/Header'; // 공통 헤더 임포트

const StudyPage = () => {
  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      
      {/* 공통 헤더 적용 */}
      <Header />

      {/* Main Content Area */}
      <main className="w-full max-w-[1280px] flex px-16 py-12 gap-12 flex-1">
        
        {/* Left Sidebar: Filters */}
        <aside className="w-64 flex flex-col gap-12 shrink-0">
          <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
            <h2 className="text-zinc-900 text-2xl font-medium leading-8">필터</h2>
            <button className="text-sky-800 text-sm font-medium tracking-tight hover:underline">
              모두 지우기
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-gray-700 text-sm font-medium uppercase tracking-wide">카테고리</h3>
            <div className="pt-1 flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <CheckSquare className="w-4 h-4 text-sky-700" />
                <span className="text-zinc-900 text-base font-medium leading-6 group-hover:text-sky-700">개발</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Square className="w-4 h-4 text-slate-300 group-hover:border-sky-700 rounded-sm" />
                <span className="text-zinc-900 text-base font-medium leading-6">디자인</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Square className="w-4 h-4 text-slate-300 group-hover:border-sky-700 rounded-sm" />
                <span className="text-zinc-900 text-base font-medium leading-6">언어</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Square className="w-4 h-4 text-slate-300 group-hover:border-sky-700 rounded-sm" />
                <span className="text-zinc-900 text-base font-medium leading-6">비즈니스</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <Square className="w-4 h-4 text-slate-300 group-hover:border-sky-700 rounded-sm" />
                <span className="text-zinc-900 text-base font-medium leading-6">자격증</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Content: Search, Sort, List */}
        <section className="flex-1 flex flex-col gap-6">
          
          {/* Search Bar */}
          <div className="p-3 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex items-center gap-5">
            <div className="flex-1 relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-600" />
              </div>
              <input 
                type="text"
                placeholder="스터디 검색..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-medium text-zinc-900 placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Results Count & Sort */}
          <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
            <div className="text-base leading-6">
              <span className="text-zinc-600 font-medium">총 </span>
              <span className="text-zinc-900 font-bold">24</span>
              <span className="text-zinc-600 font-medium">개의 스터디 그룹</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <span className="text-zinc-600 text-xs font-medium leading-4">정렬:</span>
              <div className="flex items-center gap-1">
                <span className="text-zinc-900 text-sm font-medium tracking-tight">최신순</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Study List */}
          <div className="flex flex-col gap-6">
            
            {/* Card 1 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-neutral-200 flex flex-col gap-3 hover:border-sky-700 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                  <div className="w-3 h-1.5 bg-sky-700" />
                  <span className="text-sky-700 text-xs font-medium">개발</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600 text-xs">
                  <div className="w-3 h-3 bg-zinc-600 rounded-full" />
                  <span>현재 멤버 4</span>
                </div>
              </div>
              <h3 className="text-zinc-900 text-2xl font-medium leading-8">왕초보를 위한 React 기초 스터디</h3>
              <p className="text-gray-700 text-base font-medium leading-6 line-clamp-2">
                처음부터 React를 배우기 위한 스터디 그룹을 모집합니다. 공식 문서를 따라가며 매주 작은 프로젝트
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-neutral-200 flex flex-col gap-3 hover:border-sky-700 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                  <div className="w-3 h-1.5 bg-sky-700" />
                  <span className="text-sky-700 text-xs font-medium">디자인</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600 text-xs">
                  <div className="w-3 h-3 bg-zinc-600 rounded-full" />
                  <span>현재 멤버 4</span>
                </div>
              </div>
              <h3 className="text-zinc-900 text-2xl font-semibold leading-8">Figma UI/UX 심화 컴포넌트 마스터</h3>
              <p className="text-gray-700 text-base font-medium leading-6 line-clamp-2">
                Figma의 오토 레이아웃, 베리언트, 변수를 깊이 있게 다룹니다. 컴포넌트 아키텍처 실력을 높이고 싶
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-neutral-200 flex flex-col gap-3 hover:border-sky-700 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                  <div className="w-3 h-1.5 bg-sky-700" />
                  <span className="text-sky-700 text-xs font-medium">개발</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600 text-xs">
                  <div className="w-3 h-3 bg-zinc-600 rounded-full" />
                  <span>현재 멤버 4</span>
                </div>
              </div>
              <h3 className="text-zinc-900 text-2xl font-medium leading-8">Python 자료구조 및 알고리즘 코테 대비</h3>
              <p className="text-gray-700 text-base font-medium leading-6 line-clamp-2">
                코딩 테스트를 준비합니다. Python을 사용하여 리트코드(LeetCode) 중/상급 문제를 풀고 시간/공간
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-neutral-200 flex flex-col gap-3 hover:border-sky-700 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                  <div className="w-3 h-1.5 bg-sky-700" />
                  <span className="text-sky-700 text-xs font-medium">언어</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600 text-xs">
                  <div className="w-3 h-3 bg-zinc-600 rounded-full" />
                  <span>현재 멤버 4</span>
                </div>
              </div>
              <h3 className="text-zinc-900 text-2xl font-medium leading-8">주간 비즈니스 영어 회화 스터디</h3>
              <p className="text-gray-700 text-base font-medium leading-6 line-clamp-2">
                회의 및 발표를 위한 비즈니스 영어 회화를 연습합니다. 중급 이상의 실력이 필요합니다. 현재 정원이
              </p>
            </div>

          </div>

          {/* Pagination */}
          <div className="pt-6 flex justify-center items-center gap-1">
            <button className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-400 hover:bg-stone-100 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex justify-center items-center bg-sky-800 text-white rounded font-normal leading-6">
              1
            </button>
            <button className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-900 hover:bg-stone-100 font-normal leading-6">
              2
            </button>
            <button className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-900 hover:bg-stone-100 font-normal leading-6">
              3
            </button>
            <button className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-600 hover:bg-stone-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-zinc-100 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] px-16 py-12 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-medium">StudyMate</span>
          <div className="flex gap-6">
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">개인정보처리방침</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">이용약관</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">고객센터</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">문의하기</span>
          </div>
          <span className="text-zinc-600 text-xs">© 2026 StudyMate.</span>
        </div>
      </footer>
    </div>
  );
};

export default StudyPage;