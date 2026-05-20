import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, PenSquare, Heart, Bookmark, X, MessageSquare, Edit2, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import { 
  getPostsApi, createPostApi, likePostApi, unlikePostApi, 
  getPostDetailApi, createCommentApi, bookmarkPostApi, unbookmarkPostApi,
  updatePostApi, deletePostApi,
  updateCommentApi, deleteCommentApi // 댓글 수정, 삭제 API 임포트 추가
} from '../api/auth'; 

const CommunityPage = () => {
  const [posts, setPosts] = useState<any[]>([]); 
  const [totalCount, setTotalCount] = useState(0);

  const [searchVal, setSearchVal] = useState(''); 
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostContent, setEditPostContent] = useState('');

  // 댓글 수정 모드 관련 상태 추가
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  const fetchPosts = async (isAppend: boolean = false) => {
    try {
      const data = await getPostsApi({ keyword, sort, page, size });
      setTotalCount(data.totalElements || 0);
      setTotalPages(data.totalPages || 0);

      if (isAppend) {
        setPosts((prev) => [...prev, ...(data.items || [])]);
      } else {
        setPosts(data.items || []);
      }
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchPosts(false);
  }, [sort, keyword]);

  useEffect(() => {
    if (page > 0) fetchPosts(true);
  }, [page]);

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setKeyword(searchVal);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    try {
      await createPostApi(postTitle, postContent);
      alert('게시글이 등록되었습니다.');
      setPostTitle('');
      setPostContent('');
      setIsModalOpen(false);
      if (page === 0) fetchPosts(false);
      else setPage(0); 
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  const handleLikeToggle = async (e: React.MouseEvent, id: number, currentLiked: boolean) => {
    e.stopPropagation();
    try {
      if (currentLiked) {
        await unlikePostApi(id);
        const updatePosts = (prev: any[]) => prev.map((p) => p.id === id ? { ...p, liked: false, likeCount: Math.max(0, p.likeCount - 1) } : p);
        setPosts(updatePosts);
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost((prev: any) => ({ ...prev, liked: false, likeCount: Math.max(0, prev.likeCount - 1) }));
        }
      } else {
        await likePostApi(id);
        const updatePosts = (prev: any[]) => prev.map((p) => p.id === id ? { ...p, liked: true, likeCount: p.likeCount + 1 } : p);
        setPosts(updatePosts);
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost((prev: any) => ({ ...prev, liked: true, likeCount: prev.likeCount + 1 }));
        }
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    }
  };

  const handleBookmarkToggle = async (e: React.MouseEvent, id: number, currentBookmarked: boolean) => {
    e.stopPropagation();
    try {
      if (currentBookmarked) {
        await unbookmarkPostApi(id);
        const updatePosts = (prev: any[]) => prev.map((p) => p.id === id ? { ...p, bookmarked: false } : p);
        setPosts(updatePosts);
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost((prev: any) => ({ ...prev, bookmarked: false }));
        }
      } else {
        await bookmarkPostApi(id);
        const updatePosts = (prev: any[]) => prev.map((p) => p.id === id ? { ...p, bookmarked: true } : p);
        setPosts(updatePosts);
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost((prev: any) => ({ ...prev, bookmarked: true }));
        }
      }
    } catch (error) {
      console.error('북마크 처리 실패:', error);
    }
  };

  const handlePostCardClick = async (id: number) => {
    try {
      const detailData = await getPostDetailApi(id);
      setSelectedPost(detailData);
      setIsEditingPost(false);
      setEditingCommentId(null); // 다른 글 열 때 댓글 수정 모드 초기화
      setIsDetailOpen(true);
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deletePostApi(selectedPost.id);
      alert('게시글이 삭제되었습니다.');
      setPosts((prev) => prev.filter(post => post.id !== selectedPost.id));
      setTotalCount((prev) => Math.max(0, prev - 1));
      setIsDetailOpen(false);
      setSelectedPost(null);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  const handleEditClick = () => {
    setEditPostTitle(selectedPost.title);
    setEditPostContent(selectedPost.content);
    setIsEditingPost(true);
  };

  const handleUpdatePost = async () => {
    if (!editPostTitle.trim() || !editPostContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    try {
      await updatePostApi(selectedPost.id, editPostTitle, editPostContent);
      alert('게시글이 성공적으로 수정되었습니다.');
      setSelectedPost((prev: any) => ({ ...prev, title: editPostTitle, content: editPostContent }));
      setPosts((prev) => prev.map(post => post.id === selectedPost.id ? { ...post, title: editPostTitle } : post));
      setIsEditingPost(false);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
    }
  };

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentContent.trim()) return;
    try {
      const newComment = await createCommentApi(selectedPost.id, commentContent);
      setSelectedPost((prev: any) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
      setCommentContent(''); 
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  // 댓글 수정 핸들러 추가
  const handleUpdateComment = async (commentId: number) => {
    if (!editCommentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    try {
      await updateCommentApi(commentId, editCommentContent);
      setSelectedPost((prev: any) => ({
        ...prev,
        comments: prev.comments.map((c: any) => 
          c.id === commentId ? { ...c, content: editCommentContent } : c
        )
      }));
      setEditingCommentId(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제 핸들러 추가
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await deleteCommentApi(commentId);
      setSelectedPost((prev: any) => ({
        ...prev,
        comments: prev.comments.filter((c: any) => c.id !== commentId)
      }));
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex flex-col items-center font-['Pretendard']">
      <Header />
      <main className="w-full max-w-[1280px] px-16 py-12 flex flex-col gap-6 flex-1">
        <div className="p-3 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex items-center gap-5">
          <div className="flex-1 relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-600" />
            </div>
            <input 
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="커뮤니티 게시글 검색 후 엔터..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-700 text-base"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-sky-700 hover:bg-sky-800 transition-colors rounded-md flex items-center gap-1.5 text-white"
          >
            <PenSquare className="w-4 h-4" />
            <span className="text-sm font-medium tracking-tight">글쓰기</span>
          </button>
        </div>

        <div className="pb-2 border-b border-neutral-200 flex justify-between items-center">
          <div className="text-base leading-6">
            <span className="text-zinc-600 font-medium">총 </span>
            <span className="text-zinc-900 font-bold">{totalCount}</span>
            <span className="text-zinc-600 font-medium">개의 게시글</span>
          </div>
          <div className="flex items-center gap-1 border border-stone-200 rounded px-2 py-1 bg-white">
            <span className="text-zinc-500 text-xs font-medium">정렬:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-zinc-900 text-sm font-medium bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="py-20 flex justify-center items-center text-zinc-500 bg-white rounded border border-slate-300/30">
              등록된 게시글이 없습니다.
            </div>
          ) : (
            posts.map((post) => (
              <div 
                key={post.id} 
                onClick={() => handlePostCardClick(post.id)}
                className="p-6 bg-white rounded shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-slate-300/50 flex flex-col gap-3 hover:border-slate-400 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center text-xs text-zinc-500">
                  <span className="font-medium">작성자: {post.authorId}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-zinc-900 text-xl font-semibold tracking-tight leading-7">{post.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-zinc-600">
                  <div onClick={(e) => handleLikeToggle(e, post.id, post.liked)} className="flex items-center gap-1 cursor-pointer hover:text-zinc-900 select-none">
                    <Heart className={`w-4 h-4 transition-colors ${post.liked ? 'fill-red-500 text-red-500' : 'text-zinc-400 hover:text-red-400'}`} />
                    <span>좋아요 {post.likeCount}</span>
                  </div>
                  <div onClick={(e) => handleBookmarkToggle(e, post.id, post.bookmarked)} className={`flex items-center gap-1 cursor-pointer select-none transition-colors ${post.bookmarked ? 'text-sky-700' : 'text-zinc-400 hover:text-sky-600'}`}>
                    <Bookmark className={`w-4 h-4 ${post.bookmarked ? 'fill-sky-700 text-sky-700' : 'text-zinc-400'}`} />
                    <span className="font-medium">{post.bookmarked ? '북마크됨' : '북마크'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {page < totalPages - 1 && totalPages > 0 && (
          <div className="pt-3 flex justify-center">
            <button onClick={() => setPage((prev) => prev + 1)} className="px-6 py-2.5 bg-white border border-neutral-300 text-sky-700 text-sm font-medium tracking-tight hover:bg-stone-100 rounded-md transition-colors shadow-sm">
              게시글 더 보기
            </button>
          </div>
        )}
      </main>

      {/* 작성 팝업 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl border border-stone-100 flex flex-col gap-5 relative animate-in fade-in zoom-in-95 duration-150">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-zinc-900 text-xl font-bold tracking-tight">새 게시글 작성</h3>
            </div>
            <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-zinc-900 text-sm font-medium">제목</label>
                <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base focus:outline-none"/>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-zinc-900 text-sm font-medium">내용</label>
                <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} required rows={6} className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base resize-none focus:outline-none"/>
              </div>
              <button type="submit" className="w-full mt-2 py-3 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-sm font-medium transition-colors">등록하기</button>
            </form>
          </div>
        </div>
      )}

      {/* 상세/수정 모달 UI */}
      {isDetailOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl border border-stone-100 flex flex-col gap-5 relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => { setIsDetailOpen(false); setSelectedPost(null); setCommentContent(''); setIsEditingPost(false); setEditingCommentId(null); }} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {isEditingPost ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-zinc-900 text-xl font-bold tracking-tight mb-2">게시글 수정</h3>
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-900 text-sm font-medium">제목</label>
                  <input type="text" value={editPostTitle} onChange={(e) => setEditPostTitle(e.target.value)} className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base focus:outline-none"/>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-zinc-900 text-sm font-medium">내용</label>
                  <textarea value={editPostContent} onChange={(e) => setEditPostContent(e.target.value)} rows={6} className="w-full px-3 py-2.5 bg-stone-50 rounded-md border border-slate-300 text-base resize-none focus:outline-none"/>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={() => setIsEditingPost(false)} className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-700 text-sm font-medium rounded-md">취소</button>
                  <button onClick={handleUpdatePost} className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white text-sm font-medium rounded-md">저장하기</button>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-stone-100 pb-4">
                  <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
                    <span className="font-semibold text-zinc-700">작성자: {selectedPost.authorId}</span>
                    <div className="flex items-center gap-3">
                      <span>{new Date(selectedPost.createdAt).toLocaleString()}</span>
                      
                      {selectedPost.editable && (
                        <div className="flex items-center gap-2">
                          <button onClick={handleEditClick} className="flex items-center gap-1 text-zinc-400 hover:text-sky-700 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />수정
                          </button>
                          <button onClick={handleDeletePost} className="flex items-center gap-1 text-zinc-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-zinc-900 text-2xl font-bold tracking-tight leading-8">{selectedPost.title}</h3>
                </div>

                <div className="text-zinc-800 text-base whitespace-pre-wrap min-h-32 py-2 leading-7">
                  {selectedPost.content}
                </div>

                <div className="flex items-center gap-4 py-2 border-b border-stone-100 text-sm">
                  <button onClick={(e) => handleLikeToggle(e, selectedPost.id, selectedPost.liked)} className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 select-none focus:outline-none">
                    <Heart className={`w-5 h-5 transition-colors ${selectedPost.liked ? 'fill-red-500 text-red-500' : 'text-zinc-400'}`} />
                    <span className="font-medium">좋아요 {selectedPost.likeCount}</span>
                  </button>
                  <button onClick={(e) => handleBookmarkToggle(e, selectedPost.id, selectedPost.bookmarked)} className={`flex items-center gap-1.5 text-sm font-semibold select-none focus:outline-none transition-colors ${selectedPost.bookmarked ? 'text-sky-700' : 'text-zinc-500 hover:text-sky-600'}`}>
                    <Bookmark className={`w-4 h-4 ${selectedPost.bookmarked ? 'fill-sky-700 text-sky-700' : 'text-zinc-400'}`} />
                    <span>{selectedPost.bookmarked ? '북마크 보관됨' : '북마크'}</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-zinc-900 font-semibold text-sm mb-1">
                    <MessageSquare className="w-4 h-4 text-zinc-500" />
                    <span>댓글 ({selectedPost.comments?.length || 0})</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {!selectedPost.comments || selectedPost.comments.length === 0 ? (
                      <p className="text-zinc-400 text-xs py-4 text-center">등록된 댓글이 없습니다. 첫 댓글을 작성해 보세요.</p>
                    ) : (
                      selectedPost.comments.map((comment: any) => (
                        <div key={comment.id} className="p-3.5 bg-stone-50 rounded-md border border-stone-100 flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-zinc-700">{comment.authorId}</span>
                              <span className="text-zinc-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>

                            {/* 댓글 권한(editable) 분기 처리 및 수정/삭제 버튼 제어 */}
                            {comment.editable && (
                              <div className="flex items-center gap-2">
                                {editingCommentId === comment.id ? (
                                  <>
                                    <button onClick={() => { setEditingCommentId(null); setEditCommentContent(''); }} className="text-zinc-400 hover:text-zinc-600 transition-colors">취소</button>
                                    <button onClick={() => handleUpdateComment(comment.id)} className="text-sky-700 hover:text-sky-800 transition-colors font-medium">저장</button>
                                  </>
                                ) : (
                                  <>
                                    <button 
                                      onClick={() => { setEditingCommentId(comment.id); setEditCommentContent(comment.content); }} 
                                      className="text-zinc-400 hover:text-sky-700 transition-colors"
                                    >수정</button>
                                    <button 
                                      onClick={() => handleDeleteComment(comment.id)} 
                                      className="text-zinc-400 hover:text-red-500 transition-colors"
                                    >삭제</button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {/* 댓글 수정 입력창 또는 텍스트 렌더링 */}
                          {editingCommentId === comment.id ? (
                            <textarea
                              value={editCommentContent}
                              onChange={(e) => setEditCommentContent(e.target.value)}
                              className="w-full px-2 py-1.5 mt-1 text-sm bg-white border border-stone-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-sky-700"
                              rows={2}
                            />
                          ) : (
                            <p className="text-zinc-800 text-sm leading-5 whitespace-pre-wrap">{comment.content}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleCreateComment} className="mt-2 flex gap-2">
                    <input type="text" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="댓글을 입력하세요..." required className="flex-1 px-3 py-2 bg-stone-50 rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-sky-700 text-sm"/>
                    <button type="submit" className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-md text-sm font-medium transition-colors">등록</button>
                  </form>
                </div>
              </>
            )}

            {!isEditingPost && (
              <div className="flex justify-end pt-2">
                <button onClick={() => { setIsDetailOpen(false); setSelectedPost(null); }} className="px-5 py-2 bg-stone-100 hover:bg-stone-200 text-zinc-700 text-sm font-medium rounded-md transition-colors">
                  닫기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="w-full bg-zinc-100 border-t border-slate-300 flex justify-center mt-auto">
        <div className="w-full max-w-[1280px] p-6 flex justify-between items-center">
          <span className="text-zinc-600 text-lg font-normal">StudyMate</span>
          <span className="text-zinc-900 text-xs font-normal">&copy; 2026 StudyMate. 전 세계 학습자들을 위한 인지적 명확성 증진.</span>
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;