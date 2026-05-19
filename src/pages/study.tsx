import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, CheckSquare, Square, ChevronLeft, ChevronRight, X, Calendar, Users, User } from 'lucide-react';
import Header from '../components/Header';
import { getStudyDetailApi, getStudiesApi, joinStudyApi } from '../api/auth'; // joinStudyApi 임포트

const StudyPage = () => {
  const [studies, setStudies] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedStudy, setSelectedStudy] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchStudies = async () => {
    try {
      const data = await getStudiesApi({ keyword, category, sort, page, size });
      setStudies(data.items || []);
      setTotalCount(data.totalElements || 0);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('스터디 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [page, sort, category, size]);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPage(0);
      fetchStudies();
    }
  };

  const handleStudyClick = async (id: number) => {
    try {
      const data = await getStudyDetailApi(id);
      setSelectedStudy(data);
      setIsDetailOpen(true);
    } catch (error) {
      console.error('스터디 상세 조회 실패:', error);
      alert('스터디 정보를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 스터디 참여 신청 핸들러 함수 추가
  const handleJoinStudy = async (id: number) => {
    try {
      const updatedStudy = await joinStudyApi(id);
      console.log('스터디 참여 신청 성공:', updatedStudy);
      
      alert(`${updatedStudy.name} 스터디에 참여 신청이 완료되었습니다.`);
      setSelectedStudy(updatedStudy); // 모달창 데이터 최신화
      fetchStudies(); // 목록 새로고침하여 인원 수 등 반영
    } catch (error) {
      console.error('스터디 참여 신청 실패:', error);
      alert('스터디 신청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      <Header />

      <main className="w-full max-w-[1280px] flex px-16 py-12 gap-12 flex-1">
        
        <aside className="w-64 flex flex-col gap-12 shrink-0">
          <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
            <h2 className="text-zinc-900 text-2xl font-medium leading-8">필터</h2>
            <button 
              onClick={() => { setCategory(''); setPage(0); }}
              className="text-sky-800 text-sm font-medium tracking-tight hover:underline"
            >
              모두 지우기
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-gray-700 text-sm font-medium uppercase tracking-wide">카테고리</h3>
            <div className="pt-1 flex flex-col gap-2">
              {['개발', '디자인', '언어', '비즈니스', '자격증'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  {category === cat ? (
                    <CheckSquare 
                      className="w-4 h-4 text-sky-700" 
                      onClick={() => { setCategory(''); setPage(0); }} 
                    />
                  ) : (
                    <Square 
                      className="w-4 h-4 text-slate-300 group-hover:border-sky-700 rounded-sm" 
                      onClick={() => { setCategory(cat); setPage(0); }} 
                    />
                  )}
                  <span className="text-zinc-900 text-base font-medium leading-6">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-6">
          <div className="p-3 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex items-center gap-5">
            <div className="flex-1 relative flex items-center">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-zinc-600" />
              </div>
              <input 
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                placeholder="스터디 검색 후 엔터..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base font-medium text-zinc-900 placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
            <div className="text-base leading-6">
              <span className="text-zinc-600 font-medium">총 </span>
              <span className="text-zinc-900 font-bold">{totalCount}</span>
              <span className="text-zinc-600 font-medium">개의 스터디 그룹</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <span className="text-zinc-600 text-xs font-medium leading-4">정렬:</span>
              <div className="flex items-center gap-1">
                <select 
                  value={sort} 
                  onChange={(e) => { setSort(e.target.value); setPage(0); }}
                  className="text-zinc-900 text-sm font-medium bg-transparent focus:outline-none"
                >
                  <option value="latest">최신순</option>
                  <option value="popular">인기순</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {studies.length === 0 ? (
              <div className="py-20 flex justify-center items-center text-zinc-500">
                조회된 스터디가 없습니다.
              </div>
            ) : (
              studies.map((study) => (
                <div 
                  key={study.id} 
                  onClick={() => handleStudyClick(study.id)}
                  className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-neutral-200 flex flex-col gap-3 hover:border-sky-700 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                      <span className="text-sky-700 text-xs font-medium">{study.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-600 text-xs">
                      <span>현재 멤버 {study.memberCount}명</span>
                    </div>
                  </div>
                  <h3 className="text-zinc-900 text-2xl font-medium leading-8">{study.name}</h3>
                </div>
              ))
            )}
          </div>

          <div className="pt-6 flex justify-center items-center gap-1">
            <button 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-400 hover:bg-stone-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex justify-center items-center bg-sky-800 text-white rounded font-normal leading-6">
              {page + 1}
            </button>
            <button 
              disabled={page >= totalPages - 1 || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="w-10 h-10 flex justify-center items-center rounded border border-neutral-200 text-zinc-600 hover:bg-stone-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {isDetailOpen && selectedStudy && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl border border-stone-100 flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => { setIsDetailOpen(false); setSelectedStudy(null); }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="px-2 py-1 bg-indigo-300/20 rounded-sm inline-block mb-2">
                <span className="text-sky-700 text-xs font-medium">{selectedStudy.category}</span>
              </div>
              <h3 className="text-zinc-900 text-2xl font-bold tracking-tight">{selectedStudy.name}</h3>
            </div>

            <div className="flex flex-col gap-3 border-t border-b border-stone-100 py-4 text-sm text-zinc-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-500" />
                <span className="font-medium w-24">개설자(Host ID):</span>
                <span>{selectedStudy.hostId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-500" />
                <span className="font-medium w-24">현재 인원 수:</span>
                <span>{selectedStudy.memberCount} 명</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-zinc-500" />
                <span className="font-medium w-24">생성 시각:</span>
                <span>{new Date(selectedStudy.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-medium text-zinc-900">참여 멤버 ID 명단:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedStudy.memberIds && selectedStudy.memberIds.length > 0 ? (
                    selectedStudy.memberIds.map((memberId: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 bg-stone-100 rounded text-xs text-zinc-600">
                        {memberId}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-400 text-xs">참여 멤버가 없습니다.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => { setIsDetailOpen(false); setSelectedStudy(null); }}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-700 text-sm font-medium rounded-md transition-colors"
              >
                닫기
              </button>
              
              {/* 참여하기 버튼에 handleJoinStudy 함수 연결 */}
              <button
                onClick={() => handleJoinStudy(selectedStudy.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors text-white ${
                  selectedStudy.joined ? 'bg-zinc-400 cursor-not-allowed' : 'bg-sky-700 hover:bg-sky-800'
                }`}
                disabled={selectedStudy.joined}
              >
                {selectedStudy.joined ? '이미 참여 중' : '참여하기'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-zinc-100 border-t border-slate-300 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] p-6 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-normal">StudyMate</span>
          <span className="text-zinc-900 text-xs font-normal">&copy; 2026 StudyMate.</span>
        </div>
      </footer>
    </div>
  );
};

export default StudyPage;