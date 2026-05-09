import React from 'react';
import { Settings, GraduationCap, MapPin, CalendarDays, Plus, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';

const MyPage = () => {
  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      
      {/* 공통 헤더 적용 */}
      <Header />

      <main className="w-full max-w-[1280px] px-16 py-12 flex flex-col gap-12 flex-1">
        
        {/* 프로필 섹션 */}
        <section className="relative w-full bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.02)] border border-slate-300/30 p-12 flex items-start gap-12 overflow-hidden">
          {/* 배경 장식 (우측 상단 Blur 효과) */}
          <div className="absolute -top-32 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[40px] pointer-events-none" />
          
          {/* 아바타 */}
          <img 
            className="w-32 h-32 relative z-10 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-4 border-white object-cover" 
            src="https://placehold.co/128x128" 
            alt="Profile" 
          />
          
          {/* 프로필 정보 */}
          <div className="flex-1 flex flex-col gap-4 relative z-10">
            <div>
              <h1 className="text-zinc-900 text-4xl font-bold leading-[48px]">Alex Chen</h1>
              <p className="text-zinc-600 text-lg font-medium leading-7 mt-1">컴퓨터 공학 및 인지 심리학</p>
            </div>
            
            <p className="text-gray-700 text-base font-normal leading-6 max-w-[672px]">
              Passionate about understanding how we learn and building tools to make education
              more accessible. Currently focusing on deep work techniques and distributed systems.
              Always looking for study partners in the tech space.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <div className="px-3 py-1.5 bg-zinc-100 rounded-xl border border-slate-300/50 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-700" />
                <span className="text-gray-700 text-xs font-medium">스탠퍼드 대학교</span>
              </div>
              <div className="px-3 py-1.5 bg-zinc-100 rounded-xl border border-slate-300/50 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-700" />
                <span className="text-gray-700 text-xs font-medium">팔로알토, 캘리포니아</span>
              </div>
              <div className="px-3 py-1.5 bg-zinc-100 rounded-xl border border-slate-300/50 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-700" />
                <span className="text-gray-700 text-xs font-normal">2023년 9월 가입</span>
              </div>
            </div>
          </div>

          {/* 설정 버튼 */}
          <button className="absolute top-6 right-6 p-2 rounded-xl hover:bg-stone-100 transition-colors z-10 text-zinc-600">
            <Settings className="w-5 h-5" />
          </button>
        </section>

        {/* 탭 네비게이션 */}
        <div className="w-full border-b border-slate-300 flex gap-6">
          <button className="px-3 pb-3 border-b-2 border-sky-800 text-sky-800 text-sm font-medium tracking-tight">
            내 스터디
          </button>
          <button className="px-3 pb-3 border-b-2 border-transparent text-zinc-600 text-sm font-medium tracking-tight hover:text-zinc-900">
            신청한 스터디
          </button>
          <button className="px-3 pb-3 border-b-2 border-transparent text-zinc-600 text-sm font-medium tracking-tight hover:text-zinc-900">
            설정
          </button>
        </div>

        {/* 콘텐츠 그리드/리스트 */}
        <div className="w-full flex flex-col gap-6">
          
          {/* 예정된 스터디 카드 */}
          <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className="px-3 py-1.5 bg-blue-100 rounded-sm flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 bg-sky-950 rounded-full" />
                  <span className="text-sky-950 text-xs font-medium">다음 모임: 오늘 오후 4시</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-zinc-900 text-2xl font-medium leading-8">고급 알고리즘 및 자료구조</h2>
              <p className="text-zinc-600 text-base font-medium leading-6 max-w-[700px]">
                매주 복잡한 알고리즘 문제에 대해 깊이 있게 탐구합니다. 현재는 경쟁 프로그래밍을 위한 그래프 이론과 동적 계획법 패턴에 집중하고 있습니다.
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://placehold.co/32x32" alt="Member" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://placehold.co/32x32" alt="Member" />
                <div className="w-8 h-8 bg-zinc-100 rounded-full border-2 border-white flex justify-center items-center">
                  <span className="text-zinc-600 text-xs font-medium">+3</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-zinc-600 rounded-full" />
                <span className="text-zinc-600 text-xs font-medium">다음 모임: 오늘 오후 4시</span>
              </div>
            </div>
          </div>

          {/* 주간 목표 달성도 카드 */}
          <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-4">
            <h3 className="text-zinc-600 text-sm font-medium tracking-tight">주간 목표 달성도</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-zinc-900 text-3xl font-semibold">12</span>
              <span className="text-zinc-600 text-base font-normal">/ 15시간</span>
            </div>
            {/* 프로그레스 바 */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-sky-700 rounded-full" /> {/* 12/15 = 80% */}
            </div>
            <p className="text-zinc-600 text-xs font-medium leading-5">
              이번 주 학습 목표 달성을 향해 잘 나아가고 있습니다. 계속<br/>힘내세요!
            </p>
          </div>

          {/* 완료된 스터디 1 */}
          <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="px-2 py-1 bg-zinc-100 rounded-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-700" />
                <span className="text-gray-700 text-xs font-medium">완료</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-zinc-900 text-2xl font-medium leading-8">인지 심리학 입문</h3>
            <p className="text-zinc-600 text-sm font-medium leading-5">
              기억 모델과 주의 집중력 연구에 대한 기초적인 검토입니다.
            </p>
          </div>

          {/* 완료된 스터디 2 */}
          <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="px-2 py-1 bg-zinc-100 rounded-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-700" />
                <span className="text-gray-700 text-xs font-medium">완료</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-zinc-900 text-2xl font-medium leading-8">선형 대수학 기초</h3>
            <p className="text-zinc-600 text-sm font-medium leading-5">
              행렬 연산, 벡터 및 컴퓨터 그래픽 분야에서의 응용.
            </p>
          </div>

          {/* 새 스터디 만들기 버튼 카드 */}
          <button className="w-full h-48 bg-stone-50 hover:bg-stone-100 transition-colors rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex justify-center items-center">
              <Plus className="w-6 h-6 text-sky-800" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-zinc-900 text-sm font-medium tracking-tight">새 스터디 만들기</span>
              <span className="text-zinc-500 text-xs font-medium">새로운 그룹을 만들거나 개인 학습 기록을 시작하세요</span>
            </div>
          </button>

        </div>
      </main>

      {/* 푸터 */}
      <footer className="w-full bg-zinc-100 border-t border-slate-300 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] p-6 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-normal">StudyMate</span>
          <span className="text-zinc-900 text-xs font-normal">© 2026 StudyMate. 전 세계 학습자를 위한 인지적 명확성을 육성합니다.</span>
          <div className="flex gap-4">
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">개인정보 처리방침</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">이용약관</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">고객 센터</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer hover:underline">문의하기</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyPage;