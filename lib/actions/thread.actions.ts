"use server"

import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../modgoose";
import { revalidatePath } from "next/cache";


interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export async function createThread({text, author, communityId, path} : Params){
    
    connectToDB();

    const createThread = await Thread.create({
        text,
        author,
        community: null,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
        $push: { threads: createThread._id}
    });

    revalidatePath(path);

    try {
    }catch (error:any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
   

}