"use client";
//ui + icons
import { useRouter } from "next/navigation";

//redux
import { useLazyAddUserQuery } from "@/lib/store/apiSlice/hailitApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { setAuthState } from "@/lib/store/slice/authSlice";
import { setUserState } from "@/lib/store/slice/userSlice";

//react
import { useState } from "react";

// react-hook-forms
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpForm, SignUpSchema } from "@/components/Form/FormTypes";
//supabase
import { supabaseSignUp } from "@/lib/supabaseAuth";
//types
import type { Inputs } from "@/lib/supabaseAuth";

export const useSignUp = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
  
    const [addUser, { data, error: addUserError }] = useLazyAddUserQuery();
  
    const [dataFetchError, setDataFetchError] = useState({
      error: false,
      errorDescription: "",
    });
  
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    
  
    //Form
  
    const formMethods = useForm<SignUpForm>({
      resolver: zodResolver(SignUpSchema),
    });
    const {
      handleSubmit,
      formState: { errors },
      setError,
    } = formMethods;
  
    //form submission
    //async is used to await supabaseSignUp
    const onSignUpSubmit: SubmitHandler<Inputs> = async (userData) => {
      try {
        setIsLoading(true);
        const signUpData = await supabaseSignUp(userData);
        if (signUpData && signUpData.error) {
          console.log(signUpData.error);
          setIsLoading(false);
          setDataFetchError(() => ({
            errorDescription: signUpData.error,
            error: true,
          }));
        }
  
        if (signUpData.user_id) {
          addUser({
            user_id: signUpData.user_id,
            email: signUpData.email,
          });
  
          if (addUserError) {
            return {
              error: "Error occurred",
              errorMessage: "Could not add user to database",
            };
          }
        }
      } catch (err) {}
    };
    if (data) {
      const { user } = data;
      dispatch(
        setUserState({
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          user_role: user.user_role,
          onboard: user.onboard,
        })
      );
  
      const onboard = user.onboard;
      dispatch(setAuthState(true));
  
      onboard ? router.push("/profile") : router.push("/onboarding");
    }
    return {
      onSignUpSubmit,
      formMethods,
      handleSubmit,
      dataFetchError,
      isLoading,
    };
  };
  