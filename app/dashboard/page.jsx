'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [persistenceType, setPersistenceType] = useState('Detecting...');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        determinePersistence();
      } else {
        router.replace('/auth/signin'); // 🔄 your updated sign-in route
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const determinePersistence = () => {
    try {
      const key = `firebase:authUser:${auth.config.apiKey}:[DEFAULT]`;
      const local = localStorage.getItem(key);
      const session = sessionStorage.getItem(key);

      if (local) {
        setPersistenceType('Local (Remember Me: ON)');
      } else if (session) {
        setPersistenceType('Session (Remember Me: OFF)');
      } else {
        setPersistenceType('Not found / expired');
      }
    } catch (err) {
      setPersistenceType('Error checking persistence');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading dashboard...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Welcome, {user?.displayName || user?.email || 'User'}!</h1>
      <p className="mt-3">You are now logged into the Mbit Team dashboard 🎉</p>
      <p><strong>Persistence:</strong> {persistenceType}</p>

      <button
        className="btn btn-danger mt-4"
        onClick={() => {
          signOut(auth);
          router.push('/auth/signin');
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
