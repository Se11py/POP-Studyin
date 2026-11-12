import { SignUp } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/components/AuthShell";

export default function Page() {
  return (
    <AuthShell>
      <SignUp appearance={clerkAppearance} />
    </AuthShell>
  );
}
