import { createClient } from '@/utils/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all');
  const limitParam = searchParams.get('limit');
  const offsetParam = searchParams.get('offset');

  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  // 기본 쿼리: 전체 todos를 가져오되 count 옵션 추가
  let query = supabase.from('todos').select('*', { count: 'exact' });

  if (all === 'true' || !userId) {
    query = query.order('created_at', { ascending: false });
  } else {
    query = query.eq('user_id', userId).order('created_at', { ascending: false });
  }

  // limit 옵션이 있을 경우에만 페이지네이션 처리
  if (limitParam !== null) {
    const limit = parseInt(limitParam, 10);
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
    }
    const offset = offsetParam !== null ? parseInt(offsetParam, 10) : 0;
    if (offsetParam !== null && isNaN(offset)) {
      return NextResponse.json({ error: 'Invalid offset parameter' }, { status: 400 });
    }
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ todos: data, count });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, description } = body;

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{ user_id: parseInt(userId, 10), title, description: description || '' }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ todo: data[0] });
}
