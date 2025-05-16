
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AuthNavItems = () => {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded"></div>
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-sm text-gray-600">
          {user.email}
        </span>
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link to="/auth">
        <Button variant="outline">Sign In</Button>
      </Link>
      <Link to="/auth">
        <Button className="bg-esports-purple hover:bg-esports-purple/80">Register</Button>
      </Link>
    </div>
  );
};
