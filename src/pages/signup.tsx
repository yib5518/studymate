import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signupApi } from '../api/auth';

const SignupPage = () => {
  const navigate = useNavigate();
  
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signupApi(id, password);

      if (response.status === 201) {
        const data = await response.json();
        
        // 1. 백엔드가 자동 발급했을지 모를 토큰/세션 스토리지 초기화
        localStorage.clear();
        sessionStorage.clear();
        
        // 2. 일반 자바스크립트 접근 가능 쿠키 삭제 시도
        document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        alert(`회원가입 성공! 환영합니다, ${data.id}님. 로그인 페이지에서 로그인 해주세요.`);
        
        // 3. 히스토리를 덮어쓰며 로그인 화면으로 이동 (뒤로가기 방지)
        navigate('/', { replace: true }); 
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      alert('서버와 통신 중 문제가 발생하거나 가입에 실패했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex justify-center items-center p-6">
      <div className="w-full max-w-96 flex flex-col gap-6">
        
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

        <div className="self-stretch px-8 pt-14 pb-12 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col items-start">
          <form className="self-stretch flex flex-col gap-6" onSubmit={handleSignup}>
            
            <div className="self-stretch flex flex-col gap-1">
              <label className="text-zinc-900 text-sm font-medium font-['Inter'] leading-5 tracking-tight">
                아이디
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-zinc-600" />
                </div>
                <input 
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter your ID"
                  required
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Inter'] placeholder:text-gray-500"
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Inter'] placeholder:text-gray-500"
                />
              </div>
            </div>

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