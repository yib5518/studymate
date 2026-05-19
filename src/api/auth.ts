// src/api/auth.ts

export const signupApi = async (id: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
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
  const response = await fetch('/api/auth/login', {
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
  const response = await fetch('/api/studies', {
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
  const response = await fetch(`/api/studies/${id}`, {
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

  const response = await fetch(`/api/studies?${queryParams.toString()}`, {
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
  const response = await fetch(`/api/studies/${id}/join`, {
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