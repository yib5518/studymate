// src/api/auth.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const signupApi = async (id: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password }),
  });

  if (!response.ok && response.status !== 201) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response;
};

export const loginApi = async (id: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response;
};

export const createStudyApi = async (name: string, category: string) => {
  const response = await fetch(`${BASE_URL}/api/studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, category }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json();
};

// 스터디 상세 조회 API 함수 추가
export const getStudyDetailApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/studies/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 조회 결과 데이터 반환
};

export const getStudiesApi = async (params: { 
  keyword?: string, 
  category?: string, 
  sort?: string, 
  page?: number, 
  size?: number 
}) => {
  const queryParams = new URLSearchParams();
  
  if (params.keyword) queryParams.append('keyword', params.keyword);
  if (params.category) queryParams.append('category', params.category);
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.size !== undefined) queryParams.append('size', params.size.toString());

  const response = await fetch(`${BASE_URL}/api/studies?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json();
};

export const joinStudyApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/studies/${id}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 변경된 스터디 상세 객체 반환
};

export const getPostsApi = async (params: {
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}) => {
  const queryParams = new URLSearchParams();

  if (params.keyword) queryParams.append('keyword', params.keyword);
  if (params.sort) queryParams.append('sort', params.sort);
  if (params.page !== undefined) queryParams.append('page', params.page.toString());
  if (params.size !== undefined) queryParams.append('size', params.size.toString());

  const response = await fetch(`${BASE_URL}/api/posts?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 조회 결과 데이터 반환
};

export const createPostApi = async (title: string, content: string) => {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok && response.status !== 201) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 생성된 게시글 객체 반환
};

// 게시글 좋아요 등록 API (POST)
export const likePostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 변경된 게시글 정보 또는 응답 객체 반환
};

// 게시글 좋아요 취소 API (DELETE)
export const unlikePostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 변경된 게시글 정보 또는 응답 객체 반환
};

// 게시글 상세 조회 API 함수 추가 (GET)
export const getPostDetailApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 조회 결과(댓글 목록 포함) 데이터 반환
};

// 댓글 작성 API 함수 추가 (POST)
export const createCommentApi = async (postId: number, content: string) => {
  const response = await fetch(`${BASE_URL}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 생성된 댓글 객체 반환
};

// 게시글 북마크 등록 API (POST)
export const bookmarkPostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}/bookmark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 변경된 게시글 정보 반환
};

// 게시글 북마크 취소 API (DELETE)
export const unbookmarkPostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}/bookmark`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // 변경된 게시글 정보 반환
};

// 게시글 수정 API (PATCH)
export const updatePostApi = async (id: number, title: string, content: string) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  // 백엔드 응답이 비어있을 수 있으므로 텍스트로 먼저 변환 후 처리
  const text = await response.text();
  return text ? JSON.parse(text) : {}; 
};

// 게시글 삭제 API (DELETE)
export const deletePostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }
  // 삭제는 응답 본문이 없으므로 반환하지 않음
};

// 댓글 수정 API (PATCH)
export const updateCommentApi = async (id: number, content: string) => {
  const response = await fetch(`${BASE_URL}/api/comments/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {}; 
};

// 댓글 삭제 API (DELETE)
export const deleteCommentApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }
};

// 내 정보 및 즐겨찾기 게시글 조회 API (GET)
export const getMyProfileApi = async () => {
  const response = await fetch(`${BASE_URL}/api/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }

  return response.json(); // id와 bookmarkedPosts 배열 반환
};

// 로그아웃 API (POST)
export const logoutApi = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }
};

// 회원탈퇴 API (DELETE)
export const withdrawApi = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: 상태 코드 ${response.status}`);
  }
};