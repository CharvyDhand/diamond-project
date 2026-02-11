import { auth, db } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface AdminUser {
    uid: string;
    email: string;
    role: 'admin' | 'owner';
    createdAt: Date;
}

// Admin login
export async function adminLogin(email: string, password: string): Promise<AdminUser | null> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user is an admin
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));

        if (!adminDoc.exists()) {
            const uid = user.uid;
            await signOut(auth);
            throw new Error(`Access denied. UID "${uid}" is not in the admins collection.`);
        }

        return {
            uid: user.uid,
            email: user.email!,
            role: adminDoc.data().role || 'admin',
            createdAt: adminDoc.data().createdAt?.toDate() || new Date()
        };
    } catch (error: any) {
        console.error('Admin login error:', error);
        throw error;
    }
}

// Admin logout
export async function adminLogout(): Promise<void> {
    await signOut(auth);
}

// Check if current user is admin
export async function checkAdminStatus(): Promise<boolean> {
    const user = auth.currentUser;
    if (!user) return false;

    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    return adminDoc.exists();
}

// Create admin user (run this once manually in Firebase Console or via script)
export async function createAdminUser(uid: string, email: string, role: 'admin' | 'owner' = 'admin'): Promise<void> {
    await setDoc(doc(db, 'admins', uid), {
        email,
        role,
        createdAt: new Date()
    });
}
