import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getCurrentUserRole() {
  const cookieStore = cookies();
  // ... create supabase client ...
  
  // Quick check: fetch from DB directly if you want absolute truth
  // OR rely on the session metadata for speed
  // Here is the DB method (More secure):
  
  /*
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });
  
  return user?.role; 
  */
  
  return 'USER'; // Placeholder for now
}
