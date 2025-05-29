import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const TEAM_DOC = doc(db, 'teams', 'team');

// ✅ GET team data
export async function GET() {
  try {
    const snap = await getDoc(TEAM_DOC);

    // Create default if missing
    if (!snap.exists()) {
      const defaultData = {
        name: 'mbit.dev',
        experience: 12,
        description: 'Web & App Development Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await setDoc(TEAM_DOC, defaultData);
      return Response.json({ success: true, data: { id: 'team', ...defaultData } });
    }

    return Response.json({ success: true, data: { id: snap.id, ...snap.data() } });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ UPDATE or CREATE team data
export async function PUT(request) {
  try {
    const data = await request.json();

    const updated = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    await setDoc(TEAM_DOC, updated, { merge: true });

    return Response.json({ success: true, message: 'Team updated', data: updated });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ✅ DELETE team (not usually needed for single team)
export async function DELETE() {
  try {
    await deleteDoc(TEAM_DOC);
    return Response.json({ success: true, message: 'Team deleted' });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
