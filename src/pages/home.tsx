import React, { useState } from 'react';
import Header from '../components/Header';

const HomePage = () => {
  // 메인 화면용 최신 게시글 상태
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Inter']">
      <Header />
      <main className="w-full max-w-[1280px] flex flex-col items-center pb-20">
        
        {/* Hero Section 유지 */}
        <section className="w-full px-16 pt-20 pb-12 flex flex-col items-center">
           {/* 내용 동일 */}
        </section>

        {/* Categories Section 카운트 제거 */}
        <section className="w-full px-16 py-20 flex flex-col gap-12">
          {/* ...카테고리 카드들 구조 동일, 내부 카운트 숫자는 0이나 변수 처리 필요... */}
        </section>

        {/* Community Section (더미 제거) */}
        <section className="w-full px-16 py-20 flex flex-col gap-12">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-zinc-900 text-3xl font-medium leading-10">최신 커뮤니티 게시글</h2>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sky-800 text-sm font-medium">전체보기</span>
              <div className="w-4 h-4 bg-sky-800" />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {recentPosts.length === 0 ? (
              <div className="py-10 flex justify-center items-center text-zinc-500 bg-white rounded-lg border border-slate-300/50">
                최신 게시글이 없습니다.
              </div>
            ) : (
              recentPosts.map((post, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-2">
                  {/* 최신 게시글 매핑 영역 */}
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="w-full bg-zinc-100 flex justify-center">
        {/* 푸터 내용 동일 */}
      </footer>
    </div>
  );
};

export default HomePage;