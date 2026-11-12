import { SignIn } from "@clerk/nextjs";
import AuthShell, { clerkAppearance } from "@/components/AuthShell";

export default function Page() {
  return (
    <AuthShell>
      <SignIn appearance={clerkAppearance} />
    </AuthShell>
  );
}
