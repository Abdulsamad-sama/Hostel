import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/Login-button";

export default function Home() {
  return (
    <div className="bg-blue-500 h-">
      <h1 >hello world!</h1>
      <LoginButton>
      <Button variant="secondary" size="xs" >Sign in</Button>
      </LoginButton>
    </div>
  );
}
