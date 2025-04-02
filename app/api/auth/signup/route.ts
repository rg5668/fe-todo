import { createClient } from '@/utils/client';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string | null;

  // 사용자 중복 검사: 이미 존재하는 사용자가 있으면 /error로 리다이렉트합니다.
  const { data: existingUser } = await supabase.from('users').select('*').eq('email', email).single();

  if (existingUser) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  // 신규 사용자 생성 및 삽입된 행 반환
  const { error, data } = await supabase
    .from('users')
    .insert([{ email, password, name: name || email.split('@')[0] }])
    .select();

  if (error) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  // 응답 객체 생성 (루트로 리다이렉트)
  const response = NextResponse.redirect(new URL('/', request.url));

  // 신규 가입 후 생성된 사용자 정보에서 id를 쿠키에 저장
  if (data && data.length > 0) {
    response.cookies.set('userId', String(data[0].id), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  // 페이지 캐시 재검증 (선택 사항)
  revalidatePath('/');
  return response;
}
