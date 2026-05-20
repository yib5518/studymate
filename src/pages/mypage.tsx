import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅 임포트
import { Settings, GraduationCap, MapPin, CalendarDays, Plus, X, Calendar, Users, User, Heart, Bookmark, LogOut, UserMinus } from 'lucide-react';
import Header from '../components/Header';
import { 
  createStudyApi, getStudiesApi, getStudyDetailApi, getMyProfileApi,
  logoutApi, withdrawApi // 로그아웃, 회원탈퇴 API 임포트
} from '../api/auth';

const MyPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<any>(null);

  // 탭 상태 관리에 'settings' 추가
  const [activeTab, setActiveTab] = useState<'my' | 'bookmarked' | 'settings'>('my');

  const [myStudies, setMyStudies] = useState<any[]>([]);       
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studyName, setStudyName] = useState('');
  const [studyCategory, setStudyCategory] = useState('개발');

  const [selectedStudy, setSelectedStudy] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchMyPageData = async () => {
    try {
      const studyData = await getStudiesApi({ page: 0, size: 20 });
      setMyStudies(studyData.items || []);

      const meData = await getMyProfileApi();
      setUserInfo({
        id: meData.id,
        name: meData.id, 
        major: "컴퓨터 공학 및 인지 심리학", 
        description: "학습법을 이해하고 더 접근하기 쉬운 교육 도구를 만드는 것에 열정이 있습니다.",
        profileImageUrl: "https://placehold.co/128x128"
      });
      
      setBookmarkedPosts(meData.bookmarkedPosts || []);
    } catch (error) {
      console.error('마이페이지 데이터 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchMyPageData();
  }, []);

  const handleStudyClick = async (id: number) => {
    try {
      const data = await getStudyDetailApi(id);
      setSelectedStudy(data);
      setIsDetailOpen(true);
    } catch (error) {
      console.error('스터디 상세 조회 실패:', error);
    }
  };

  const handleCreateStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studyName.trim()) {
      alert('스터디 이름을 입력해주세요.');
      return;
    }

    try {
      const newStudy = await createStudyApi(studyName, studyCategory);
      setMyStudies((prev) => [newStudy, ...prev]);
      alert('스터디가 성공적으로 생성되었습니다!');
      setStudyName('');
      setStudyCategory('개발');
      setIsModalOpen(false);
    } catch (error) {
      console.error('스터디 생성 실패:', error);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    
    try {
      await logoutApi();
      // 성공 시 로컬 스토리지/토큰 등 세션 정리 로직이 필요하다면 여기에 추가
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 처리 중 오류가 발생했습니다.');
    }
  };

  // 회원탈퇴 핸들러
  const handleWithdraw = async () => {
    if (!window.confirm('정말로 회원탈퇴를 진행하시겠습니까? 모든 정보가 삭제되며 복구할 수 없습니다.')) return;
    
    try {
      await withdrawApi();
      alert('회원탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
      // 세션 정리 로직이 필요하다면 여기에 추가
      navigate('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      <Header />

      <main className="w-full max-w-[1280px] px-16 py-12 flex flex-col gap-12 flex-1">
        
        {/* 프로필 섹션 */}
        <section className="relative w-full bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.02)] border border-slate-300/30 p-12 flex items-start gap-12 overflow-hidden">
          <div className="absolute -top-32 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[40px] pointer-events-none" />
          
          <img 
            className="w-32 h-32 relative z-10 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-4 border-white object-cover bg-gray-100" 
            src={userInfo?.profileImageUrl || "https://placehold.co/128x128"} 
            alt="Profile" 
          />
          
          <div className="flex-1 flex flex-col gap-4 relative z-10">
            {userInfo ? (
              <>
                <div>
                  <h1 className="text-zinc-900 text-4xl font-bold leading-[48px]">{userInfo.name}</h1>
                  <p className="text-zinc-600 text-lg font-medium leading-7 mt-1">{userInfo.major}</p>
                </div>
                <p className="text-gray-700 text-base font-normal leading-6 max-w-[672px]">
                  {userInfo.description}
                </p>
              </>
            ) : (
              <div className="text-gray-400 py-4">사용자 정보를 불러오는 중입니다...</div>
            )}
            
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
          <button 
            onClick={() => setActiveTab('settings')} // 아이콘 클릭 시 설정 탭으로 이동 기능 추가
            className="absolute top-6 right-6 p-2 rounded-xl hover:bg-stone-100 transition-colors z-10 text-zinc-600"
          >
            <Settings className="w-5 h-5" />
          </button>
        </section>

        {/* 탭 네비게이션 */}
        <div className="w-full border-b border-slate-300 flex gap-6">
          <button 
            onClick={() => setActiveTab('my')}
            className={`px-3 pb-3 border-b-2 text-sm font-medium tracking-tight transition-colors ${
              activeTab === 'my' ? 'border-sky-800 text-sky-800' : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            내 스터디
          </button>
          <button 
            onClick={() => setActiveTab('bookmarked')}
            className={`px-3 pb-3 border-b-2 text-sm font-medium tracking-tight transition-colors ${
              activeTab === 'bookmarked' ? 'border-sky-800 text-sky-800' : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            즐겨찾기한 게시글
          </button>
          {/* 설정 탭 추가 */}
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-3 pb-3 border-b-2 text-sm font-medium tracking-tight transition-colors ${
              activeTab === 'settings' ? 'border-sky-800 text-sky-800' : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            설정
          </button>
        </div>

        {/* 콘텐츠 리스트 출력 영역 */}
        <div className="w-full flex flex-col gap-6">
          {activeTab === 'my' && (
            <>
              {myStudies.length === 0 ? (
                <div className="py-14 flex justify-center items-center text-zinc-500 bg-white rounded-lg border border-neutral-200">
                  개설한 스터디가 없습니다.
                </div>
              ) : (
                myStudies.map((study, idx) => (
                  <div 
                    key={study.id || idx} 
                    onClick={() => study.id && handleStudyClick(study.id)} 
                    className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-4 hover:border-sky-700 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div className="px-2 py-1 bg-indigo-300/20 rounded-sm flex items-center gap-1">
                        <span className="text-sky-700 text-xs font-medium">{study.category}</span>
                      </div>
                      <span className="text-zinc-500 text-xs">
                        {study.memberCount !== undefined ? `멤버 수: ${study.memberCount}명` : '멤버 정보 없음'}
                      </span>
                    </div>
                    <h2 className="text-zinc-900 text-2xl font-medium leading-8">{study.name}</h2>
                    {study.createdAt && (
                      <span className="text-zinc-400 text-xs">개설일: {new Date(study.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                ))
              )}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-48 bg-stone-50 hover:bg-stone-100 transition-colors rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex justify-center items-center">
                  <Plus className="w-6 h-6 text-sky-800" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-zinc-900 text-sm font-medium tracking-tight">새 스터디 만들기</span>
                  <span className="text-zinc-500 text-xs font-medium">새로운 그룹을 만들거나 개인 학습 기록을 시작하세요</span>
                </div>
              </button>
            </>
          )}

          {activeTab === 'bookmarked' && (
            <>
              {bookmarkedPosts.length === 0 ? (
                <div className="py-14 flex justify-center items-center text-zinc-500 bg-white rounded-lg border border-neutral-200">
                  즐겨찾기한 게시글이 없습니다.
                </div>
              ) : (
                bookmarkedPosts.map((post, idx) => (
                  <div 
                    key={post.id || idx} 
                    className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center text-xs text-zinc-500">
                      <span className="font-medium">작성자: {post.authorId}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-zinc-900 text-xl font-semibold tracking-tight leading-7">{post.title}</h2>
                    <div className="flex items-center gap-4 mt-1 text-xs text-zinc-600">
                      <div className="flex items-center gap-1">
                        <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
                        <span>좋아요 {post.likeCount}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sky-700">
                        <Bookmark className="w-3.5 h-3.5 fill-sky-700 text-sky-700" />
                        <span className="font-medium">북마크 보관됨</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* 설정 탭 콘텐츠 */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-4 max-w-lg">
              <h2 className="text-zinc-900 text-xl font-semibold mb-2">계정 관리</h2>
              
              <div className="p-6 bg-white rounded-lg shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/30 flex flex-col gap-6">
                
                {/* 로그아웃 영역 */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-900 font-medium">로그아웃</span>
                    <span className="text-zinc-500 text-sm">현재 기기에서 계정을 로그아웃합니다.</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 border border-slate-300 hover:bg-stone-50 rounded-md text-zinc-700 text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                  </button>
                </div>

                <div className="w-full h-px bg-slate-200" />

                {/* 회원탈퇴 영역 */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-900 font-medium">회원탈퇴</span>
                    <span className="text-zinc-500 text-sm">모든 계정 정보와 활동 기록이 영구적으로 삭제됩니다.</span>
                  </div>
                  <button 
                    onClick={handleWithdraw}
                    className="px-4 py-2 border border-red-200 bg-red-50 hover:bg-red-100 rounded-md text-red-600 text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <UserMinus className="w-4 h-4" />
                    회원탈퇴
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      {/* 스터디 생성 팝업 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl border border-stone-100 flex flex-col gap-5 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-zinc-900 text-xl font-bold tracking-tight">새 스터디 그룹 만들기</h3>
            </div>
            <form onSubmit={handleCreateStudy} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-zinc-900 text-sm font-medium">스터디 이름</label>
                <input type="text" value={studyName} onChange={(e) => setStudyName(e.target.value)} placeholder="예: 알고리즘 코테 대비 모임" required className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base focus:outline-none"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-zinc-900 text-sm font-medium">카테고리</label>
                <select value={studyCategory} onChange={(e) => setStudyCategory(e.target.value)} className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base focus:outline-none">
                  <option value="개발">개발</option>
                  <option value="디자인">디자인</option>
                  <option value="언어">언어</option>
                  <option value="비즈니스">비즈니스</option>
                  <option value="자격증">자격증</option>
                </select>
              </div>
              <button type="submit" className="w-full mt-2 py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-sm font-medium transition-colors shadow-sm">생성하기</button>
            </form>
          </div>
        </div>
      )}

      {/* 스터디 상세 정보 조회 모달 UI */}
      {isDetailOpen && selectedStudy && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl border border-stone-100 flex flex-col gap-5 relative">
            <button onClick={() => { setIsDetailOpen(false); setSelectedStudy(null); }} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="px-2 py-1 bg-indigo-300/20 rounded-sm inline-block mb-2">
                <span className="text-sky-700 text-xs font-medium">{selectedStudy.category}</span>
              </div>
              <h3 className="text-zinc-900 text-2xl font-bold tracking-tight">{selectedStudy.name}</h3>
            </div>
            <div className="flex flex-col gap-3 border-t border-b border-stone-100 py-4 text-sm text-zinc-700">
              <div className="flex items-center gap-2"><User className="w-4 h-4 text-zinc-500" /><span className="font-medium w-24">개설자(Host ID):</span><span>{selectedStudy.hostId}</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-zinc-500" /><span className="font-medium w-24">현재 인원 수:</span><span>{selectedStudy.memberCount} 명</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-500" /><span className="font-medium w-24">생성 시각:</span><span>{new Date(selectedStudy.createdAt).toLocaleString()}</span></div>
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-medium text-zinc-900">참여 멤버 ID 명단:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedStudy.memberIds && selectedStudy.memberIds.length > 0 ? (
                    selectedStudy.memberIds.map((memberId: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 bg-stone-100 rounded text-xs text-zinc-600">{memberId}</span>
                    ))
                  ) : (
                    <span className="text-zinc-400 text-xs">참여 멤버가 없습니다.</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => { setIsDetailOpen(false); setSelectedStudy(null); }} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-700 text-sm font-medium rounded-md transition-colors">닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="w-full bg-zinc-100 border-t border-slate-300 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] p-6 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-normal">StudyMate</span>
          <span className="text-zinc-900 text-xs font-normal">&copy; 2026 StudyMate. 전 세계 학습자를 위한 인지적 명확성을 육성합니다.</span>
        </div>
      </footer>
    </div>
  );
};

export default MyPage;