import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="w-full bg-stone-50 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-b border-slate-300 flex justify-center sticky top-0 z-50 font-['Pretendard']">
      <div className="w-full max-w-[1280px] h-16 px-16 flex justify-between items-center">
        
        {/* 로고 영역 (홈으로 이동) */}
        <Link to="/home" className="text-sky-800 text-2xl font-bold flex items-center gap-2">
          <div className="w-5 h-4 bg-sky-800" />
          StudyMate
        </Link>
        
        {/* 네비게이션 탭 */}
        <div className="flex items-center gap-12 h-full">
          <Link 
            to="/study" 
            className={`h-full flex items-center text-base font-medium ${path.includes('/study') ? 'border-b-2 border-sky-800 text-sky-800' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            스터디
          </Link>
          <Link 
            to="/community" 
            className={`h-full flex items-center text-base font-medium ${path.includes('/community') ? 'border-b-2 border-sky-800 text-sky-800' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            커뮤니티
          </Link>
          <Link 
            to="/mypage" 
            className={`h-full flex items-center text-base font-medium ${path.includes('/mypage') ? 'border-b-2 border-sky-800 text-sky-800' : 'text-zinc-600 hover:text-zinc-900'}`}
          >
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;