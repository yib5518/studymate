import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  // 상태 관리 추가
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // POST 요청 전송
      const response = await loginApi(id, password);

      // 성공 시 홈으로 이동
      if (response.ok) {
        navigate('/home'); 
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
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
            <h1 className="text-center text-sky-800 text-3xl font-semibold font-['Pretendard'] leading-10">
              StudyMate
            </h1>
          </div>
          <div className="self-stretch pb-[0.59px] flex flex-col items-center">
            <p className="text-center text-zinc-600 text-base font-medium font-['Pretendard'] leading-6">
              깊은 몰입을 위한 인지적 명확성을 기릅니다.
            </p>
          </div>
        </div>

        <div className="self-stretch px-8 pt-14 pb-12 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col items-start">
          <form className="self-stretch flex flex-col gap-6" onSubmit={handleLogin}>
            
            {/* 아이디 입력 필드 */}
            <div className="self-stretch flex flex-col gap-1">
              <label className="text-zinc-900 text-sm font-medium font-['Pretendard'] leading-5 tracking-tight">
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
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Pretendard'] placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="self-stretch flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-zinc-900 text-sm font-medium font-['Pretendard'] leading-5 tracking-tight">
                  비밀번호
                </label>
              </div>
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
                  className="w-full pl-10 pr-3 py-3.5 bg-white rounded-sm border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-normal font-['Pretendard'] placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button 
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-sky-700 hover:bg-sky-800 transition-colors rounded-sm shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] flex justify-center items-center gap-1 group"
            >
              <span className="text-white text-sm font-medium font-['Pretendard'] leading-5 tracking-tight">
                로그인
              </span>
              <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>

        <div className="self-stretch h-6 flex justify-center items-center gap-2">
          <span className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-6">
            계정이 없으신가요? 
          </span>
          <Link 
            to="/signup" 
            className="text-sky-700 text-sm font-bold font-['Pretendard'] leading-5 tracking-tight hover:underline"
          >
            회원가입
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;