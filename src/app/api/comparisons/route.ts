import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (uses service role if available, else anon key)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET = 'images';
const TABLE = 'comparisons';

/* ───────────────────────────────────────────────
   GET  /api/comparisons
   Returns all comparison entries from Supabase DB
─────────────────────────────────────────────── */
export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map snake_case DB columns → camelCase for frontend
  const entries = (data ?? []).map((row: any) => ({
    id: row.id,
    location: row.location,
    yearBefore: row.year_before,
    yearAfter: row.year_after,
    category: row.category,
    description: row.description,
    beforeImage: row.before_image_url,
    afterImage: row.after_image_url,
    createdAt: row.created_at,
  }));

  return NextResponse.json(entries);
}

/* ───────────────────────────────────────────────
   POST /api/comparisons
   Accepts multipart/form-data with:
     - beforeImage (File)
     - afterImage  (File)
     - location    (string)
     - yearBefore  (string/number)
     - yearAfter   (string/number)
     - category    (string)
     - description (string)
─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const beforeFile = formData.get('beforeImage') as File | null;
    const afterFile  = formData.get('afterImage')  as File | null;
    const location   = formData.get('location')    as string;
    const yearBefore = Number(formData.get('yearBefore'));
    const yearAfter  = Number(formData.get('yearAfter'));
    const category   = formData.get('category')    as string;
    const description = formData.get('description') as string;

    if (!beforeFile || !afterFile) {
      return NextResponse.json({ error: 'Both before and after images are required.' }, { status: 400 });
    }

    // Upload helper
    const uploadImage = async (file: File, label: 'before' | 'after'): Promise<string> => {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `${label}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: false });

      if (error) throw new Error(`Storage upload failed (${label}): ${error.message}`);

      // Build public URL
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return urlData.publicUrl;
    };

    const [beforeImageUrl, afterImageUrl] = await Promise.all([
      uploadImage(beforeFile, 'before'),
      uploadImage(afterFile,  'after'),
    ]);

    // Insert row into DB
    const { data, error: dbError } = await supabase
      .from(TABLE)
      .insert({
        location,
        year_before: yearBefore,
        year_after:  yearAfter,
        category,
        description,
        before_image_url: beforeImageUrl,
        after_image_url:  afterImageUrl,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      id: data.id,
      location: data.location,
      yearBefore: data.year_before,
      yearAfter:  data.year_after,
      category:   data.category,
      description: data.description,
      beforeImage: data.before_image_url,
      afterImage:  data.after_image_url,
      createdAt:   data.created_at,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Unexpected error' }, { status: 500 });
  }
}
