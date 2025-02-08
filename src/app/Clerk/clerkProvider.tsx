import { ClerkProvider } from "@clerk/clerk-react";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkKey) {
  throw new Error(
    "Clerk publishable key is missing. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables."
  );
}

const ClerkConfig = ({ children }: { children: React.ReactNode }) => (
  <ClerkProvider publishableKey={clerkKey}>
    {children}
  </ClerkProvider>
);

export default ClerkConfig;
