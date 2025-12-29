import { Session } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "supabaseClient";

type AuthContextType = {
    session: Session | null;
    loading: boolean; // to track user's session status, whether its being loading or finished
};

const AuthContext = createContext<AuthContextType>({
    session : null,
    loading: true, // initially set to true
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // getSession obj, then get session value from data var(nested) and give it as arg
        supabase.auth.getSession().then(({ data:{session} }) => { 
            setSession(session);
            setLoading(false);
        });

        // update session when auth changes happens. _event represents the type of auth event. We didnt use it in the code, but we have to specify it because the AuthStateChange func expects 2 args in its callback function. (_ is to specify its not used in the code)
        //onAuthStateChange acts as listener
        const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // unsubscribe to stop the listener
        return () => subscription.unsubscribe();
    },[]);

    const value = {session,loading}; // bundle session and loading in value

    // send value as a prop. !loading && children is used coz, when loading is true(initially it will be...), children will not render. This is to make the Provider wait for the session check to complete.
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};