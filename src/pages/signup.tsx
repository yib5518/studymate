import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const SignupPage = () => {
  const navigate = useNavigate(); // navigate 함수 생성

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // 현재는 별도의 검증 로직 없이 바로 로그인 페이지로 이동합니다.
    navigate('/'); 
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex justify-center items-center p-6">
      <div className="w-full max-w-96 flex flex-col gap-6">
        
        {/* 상단 로고 및 헤더 영역 */}
        <div className="self-stretch flex flex-col items-center gap-[3px]">
          <div className="p-3 bg-blue-100 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-center">
            <div className="w-7 h-5 bg-sky-800 rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-white opacity-20 rotate-45" />
            </div>
          </div>
          <div className="self-stretch pt-[5px] flex flex-col items-center">
            <h1 className="text-center text-sky-800 text-3xl font-semibold font-['Inter'] leading-10">
              StudyMate
            </h1>
          </div>
          <div className="self-stretch pb-[0.59px] flex flex-col items-center">
            <p className="text-center text-zinc-600 text-base font-medium font-['Inter'] leading-6">
              깊은 몰입을 위한 인지적 명확성을 기릅니다.
            </p>
          </div>
        </div>

        {/* 회원가입 폼 카드 */}
        <div className="self-stretch px-8 pt-14 pb-12 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col items-start">
          {/* onSubmit에 handleSignup 연결 */}
          <form className="self-stretch flex flex-col gap-6" onSubmit={handleSignup}>
            
            {/* 이메일 입력 필드 */}
            <div className="self-stretch flex flex-col gap-1">
              <label className="text-zinc-900 text-sm font-medium font-['Inter'] leading-5 tracking-tight">
                이메일 주소
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-zinc-600" />
                </div>
                <input 
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Inter'] placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="self-stretch flex flex-col gap-1">
              <label className="text-zinc-900 text-sm font-medium font-['Inter'] leading-5 tracking-tight">
                비밀번호
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-zinc-600" />
                </div>
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Inter'] placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button 
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-sky-700 hover:bg-sky-800 transition-colors rounded-sm shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-1 group"
            >
              <span className="text-white text-sm font-medium font-['Inter'] leading-5 tracking-tight">
                회원가입
              </span>
              <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;