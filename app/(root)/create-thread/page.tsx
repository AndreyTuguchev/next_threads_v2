import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import {redirect } from 'next/navigation'

async function Page(){
    const user = await currentUser();

    if( !user ) return null;

    const userInfo = await fetchUser(user.id);


    // TODO fix UploadThing issue which causes an error with profile picture upload
    // if( !userInfo?.onboarded ) redirect('/onboarding');
    
    return (
    <>
        <h1 className="head-text">Create Threads</h1>

        <PostThread userId={userInfo._id} />
    </>
    )
}

export default Page