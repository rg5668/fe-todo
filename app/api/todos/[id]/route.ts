import { createClient } from '@/utils/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  // 단일 Todo 상세 정보 조회 (userId 조건을 추가하여 본인 Todo만 조회)
  const { data, error } = await supabase.from('todos').select('*').eq('id', id).eq('user_id', userId).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: 'Todo not found or not authorized' }, { status: 404 });
  }

  return NextResponse.json({ todo: data });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;

  // userId 조건 추가하여 본인 Todo만 삭제 가능하도록 함
  const { data, error } = await supabase.from('todos').delete().eq('id', id).eq('user_id', userId).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Todo not found or not authorized' }, { status: 404 });
  }
  return NextResponse.json({ deleted: data[0] });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createClient();
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const { title, description, completed } = body;

  // 업데이트할 필드만 선택적으로 적용
  const updates: { title?: string; description?: string; completed?: boolean } = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (completed !== undefined) updates.completed = completed;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields provided for update' }, { status: 400 });
  }

  const { data, error } = await supabase.from('todos').update(updates).eq('id', id).eq('user_id', userId).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'Todo not found or not authorized' }, { status: 404 });
  }
  return NextResponse.json({ todo: data[0] });
}
