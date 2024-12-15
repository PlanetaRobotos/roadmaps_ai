import { handleSignOut } from '@/lib/auth-actions';

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
