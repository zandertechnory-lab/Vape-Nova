import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/">
            <span className="text-4xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              VapeNova
            </span>
          </a>
          <p className="text-gray-400 mt-2 text-sm">Premium vapes, vaporizers &amp; gummies</p>
        </div>
        <div className="flex justify-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
