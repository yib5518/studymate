import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Inter']">
      
      {/* 공통 헤더 적용 */}
      <Header />

      {/* 2. Main Content */}
      <main className="w-full max-w-[1280px] flex flex-col items-center pb-20">
        
        {/* Hero Section */}
        <section className="w-full px-16 pt-20 pb-12 flex flex-col items-center">
          <div className="mb-6 px-3 py-1 bg-stone-100 rounded-xl inline-flex items-center gap-2">
            <div className="w-3.5 h-3 bg-zinc-600" />
            <span className="text-zinc-600 text-sm font-medium">전 세계 50,000명 이상의 활발한 학습자와 함께하세요</span>
          </div>
          
          <h1 className="text-center text-4xl font-medium leading-[50px] mb-3">
            <span className="text-zinc-900">완벽한 </span>
            <span className="text-sky-700">스터디 파트너</span>
            <span className="text-zinc-900">를 찾아보세요</span>
          </h1>
          
          <p className="text-center text-gray-700 text-lg font-medium leading-7 mb-8">
            인지적 명확성과 집중력을 높이세요. 프로그래밍, 언어, 시<br/>험 준비를 함께할 열정적인 동료들과 연결해 드립니다.
          </p>

          <div className="w-full max-w-[672px] relative flex flex-col">
            <div className="w-full px-20 py-3.5 bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300">
              <span className="text-gray-500 text-lg font-medium">과목, 주제 또는 시험 검색...</span>
            </div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-300" />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-6 py-3.5 bg-sky-700 rounded-xl text-white text-sm font-medium">
              스터디 찾기
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full px-16 py-20 flex flex-col gap-12">
          <div>
            <h2 className="text-zinc-900 text-3xl font-medium leading-10">카테고리 둘러보기</h2>
            <p className="text-gray-700 text-base font-medium leading-6">깊은 몰입을 위한 구조화된 환경</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {/* 언어 카드 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="w-10 h-10 mb-2 bg-stone-100 rounded border border-slate-300/30 flex justify-center items-center">
                  <div className="w-6 h-5 bg-sky-700" />
                </div>
                <h3 className="text-zinc-900 text-2xl font-medium leading-8">언어</h3>
                <p className="text-gray-700 text-base font-medium leading-6 mt-1">말하기와 이해를 위한 몰입형 연습 세션.</p>
              </div>
              <div className="mt-6 px-3 py-1 bg-zinc-100 rounded-md self-start text-neutral-700 text-xs font-medium">
                850 개의 활동 중인 스터디
              </div>
            </div>

            {/* 시험 카드 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="w-10 h-10 mb-2 bg-stone-100 rounded border border-slate-300/30 flex justify-center items-center">
                  <div className="w-5 h-4 bg-sky-700" />
                </div>
                <h3 className="text-zinc-900 text-2xl font-medium leading-8">시험</h3>
                <p className="text-gray-700 text-base font-normal leading-6 mt-1">SAT, GRE, GMAT 등을 위한 구조화된 준비<br/>모임.</p>
              </div>
              <div className="mt-6 px-3 py-1 bg-zinc-100 rounded-md self-start text-neutral-700 text-xs font-medium">
                412 개의 활동 중인 스터디
              </div>
            </div>

            {/* 프로그래밍 카드 */}
            <div className="p-12 relative bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col justify-between overflow-hidden min-h-[250px]">
              <div className="absolute top-[-79px] right-[-50px] w-64 h-64 bg-indigo-300/20 rounded-xl blur-[32px]" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 bg-stone-100 rounded border border-slate-300/30 flex justify-center items-center">
                  <div className="w-6 h-3.5 bg-sky-700" />
                </div>
                <h3 className="text-zinc-900 text-3xl font-semibold leading-10 mb-3">Programming</h3>
                <p className="text-gray-700 text-lg font-medium leading-7">
                  인지적 명확성과 집중력을 높이세요. 프로그래밍, 언어, 시험 준비를 함께할 열정적인 동료들과 연결해 드립니다.
                </p>
              </div>
              <div className="mt-12 flex justify-between items-center relative z-10">
                <div className="px-3 py-1 bg-zinc-100 rounded-md text-neutral-700 text-sm font-medium">
                  1,240 active studies
                </div>
                <div className="w-4 h-4 bg-gray-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="w-full px-16 py-20 flex flex-col gap-12">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-zinc-900 text-3xl font-medium leading-10">최신 커뮤니티 게시글</h2>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sky-800 text-sm font-medium">전체보기</span>
              <div className="w-4 h-4 bg-sky-800" />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {/* 게시글 1 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="text-zinc-900 text-lg font-medium">효율적인 파이썬 공부법 공유합니다</h3>
                <span className="text-gray-500 text-xs">2024.05.20</span>
              </div>
              <p className="text-gray-700 text-base font-medium leading-6">
                데이터 분석을 위한 파이썬 라이브러리 활용법과 실무 프로젝트 적용 사례를 정리해 보았습니다. 함께 스터디하실 분들 환영해요.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-zinc-600" />
                <span className="text-zinc-600 text-xs font-medium">코딩마스터</span>
              </div>
            </div>

            {/* 게시글 2 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="text-zinc-900 text-lg font-medium">토익 900점 달성 후기 및 교재 추천</h3>
                <span className="text-gray-500 text-xs">2024.05.19</span>
              </div>
              <p className="text-gray-700 text-base font-medium leading-6">
                단기간에 점수를 올릴 수 있었던 오답 노트 작성법과 추천 교재 리스트입니다. 목표 점수 달성하시길 바랍니다!
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-zinc-600" />
                <span className="text-zinc-600 text-xs font-medium">영어정복자</span>
              </div>
            </div>

            {/* 게시글 3 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="text-zinc-900 text-lg font-medium">비전공자 개발자 취업 준비 질문 리스트</h3>
                <span className="text-gray-500 text-xs">2024.05.18</span>
              </div>
              <p className="text-gray-700 text-base font-medium leading-6">
                면접에서 자주 물어보는 CS 기초 지식과 비전공자로서 강점을 어필하는 방법에 대해 고민이 많네요. 의견 부탁드려요.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-zinc-600" />
                <span className="text-zinc-600 text-xs font-medium">열정러너</span>
              </div>
            </div>
            
            {/* 게시글 4 */}
            <div className="p-6 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="text-zinc-900 text-lg font-medium">GRE 퀀트 고득점 스터디 모집합니다</h3>
                <span className="text-gray-500 text-xs">2024.05.17</span>
              </div>
              <p className="text-gray-700 text-base font-medium leading-6">
                미국 대학원 입시 준비하시는 분들 계신가요? 주 2회 온라인으로 수학 기출 풀이 위주로 진행할 예정입니다.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-zinc-600" />
                <span className="text-zinc-600 text-xs font-medium">유학준비생</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-zinc-100 flex justify-center">
        <div className="w-full max-w-[1280px] px-16 py-12 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-medium">StudyMate</span>
          <div className="flex gap-6">
            <span className="text-zinc-600 text-xs font-medium cursor-pointer">개인정보처리방침</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer">이용약관</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer">고객센터</span>
            <span className="text-zinc-600 text-xs font-medium cursor-pointer">문의하기</span>
          </div>
          <span className="text-zinc-600 text-xs">© 2026 StudyMate.</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;