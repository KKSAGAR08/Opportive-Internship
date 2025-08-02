import React from 'react'
import SignupForm from "../components/ui/signup-form" 

function signup() {
  return (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    )
}

export default signup
