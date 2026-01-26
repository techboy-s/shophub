// "use client";

// import { signIn } from "@/lib/auth-client"; // Import from your client file
// import { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     await signIn.social({
//       provider: "google",
//       callbackURL: "/", // Redirect after login
//     });
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400">
//             Sign in to access your cart and orders
//           </p>
//         </div>

//         {/* Google Button */}
//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200 relative overflow-hidden group"
//         >
//           {loading ? (
//             <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
//           ) : (
//             <>
//               {/* Google Icon SVG */}
//               <svg className="h-5 w-5" viewBox="0 0 24 24">
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//               </svg>
//               <span>Continue with Google</span>
//             </>
//           )}
//         </button>

//         <div className="relative my-8">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t border-gray-200 dark:border-slate-800" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">
//               Or continue with email
//             </span>
//           </div>
//         </div>

//         {/* Email Form (Placeholder for future expansion) */}
//         <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//               Email address
//             </label>
//             <input
//               type="email"
//               disabled
//               placeholder="name@example.com"
//               className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             />
//           </div>
//           <button
//             disabled
//             className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg opacity-50 cursor-not-allowed"
//           >
//             Sign in (Coming Soon)
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm text-slate-500">
//           By clicking continue, you agree to our{" "}
//           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//             Privacy Policy
//           </a>
//           .
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. Handle Email/Password Login
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn.email({
      email,
      password,
      callbackURL: "/",
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      },
    });
  };

  // 2. Handle Google Login (Existing)
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        {/* --- Email Form --- */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
          </button>
        </form>

        {/* --- Divider --- */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* --- Google Button --- */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
          Google
        </button>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-600 font-bold hover:underline">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}