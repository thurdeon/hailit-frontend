
import { createClient } from "@supabase/supabase-js";



export type Inputs = {
  email: string;
  password: string;
};

export const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_ID;
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, publicAnonKey);


export const supabaseSignUp = async (userInputs: Inputs) => {
  const { data, error } = await supabase.auth.signUp({
    email: userInputs.email,
    password: userInputs.password,
  });

  if (error) {
    return {error: error.message}
  }
  const userData:any = {
    user_id: data.user?.id,
    email: data.user?.email,
  }
  // const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  
  return userData;
  
};

export const supabaseSignIn = async (userInputs: Inputs) => {
  try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInputs.email,
    password: userInputs.password,
  });
  
  if(error) {
    return {
      error: error.message
    }
  }

  const user_id:any = data.user?.id
  // const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  return {user_id};

  } catch (err) {
    return {error: `Error Occurred: ${err}`}
  }
};

export const googleSupabaseSignIn = async ()=> {
  try {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  if (error) {
    return {
      error: "Error signing in via google"
    }
  }
  // const user_id:any = data.user?.id
  return data;

 } catch (err) {
  return {error: `Error Occurred: ${err}`}
 }
}
export const supabaseSession = async ()=> {
    
const { data, error } = await supabase.auth.getSession()
if(error) {
  return {
    error: "Error retrieving session"
  }
}
return data.session;

}


export const sessionBearerToken = async ()=> {
    
  const { data, error } = await supabase.auth.getSession()
  if(error) {
    return {
      error: error.status,
      errorDescription: error.message
    }
  }
  
  const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  return {bearerToken};
  
  }

export const supabaseSignOut = async () => {
  await supabase.auth.signOut()
  window.location.reload();
  
};
