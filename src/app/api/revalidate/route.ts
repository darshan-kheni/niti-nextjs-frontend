import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('authorization')
  if (secret !== `Bearer ${process.env.REVALIDATION_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { chapterId?: number } = {}
  try {
    body = await request.json()
  } catch {}

  revalidatePath('/')
  if (body.chapterId) revalidatePath(`/chapter/${body.chapterId}`)

  return NextResponse.json({ revalidated: true })
}
