export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";
import prisma from "../../prisma";
import SubmitButton from "@/app/components/SubmitButton";

async function fetchData(id) {
    const data = await prisma.comment.findMany({
        where: {
            movieId: id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return data;
}

async function postData(formData) {
    "use server";
    const data = await prisma.comment.create(
        {
            data: {
                message: formData.get("comment"),
                movieId: formData.get("id")
            }
        }
    );
    revalidatePath("/movie/[id]", "page");
}

async function Comments ({params}) {
    const data = await fetchData(params.id);
    return (
        <div className="rounded-lg border p-3">
            <h1 className="text-xl font-semibold mb-5">Your opinion</h1>
            <div>
                <form action={postData}>
                    <textarea name="comment" placeholder="Add your comment" className="w-full border resize-none border-teal-500 p-3 rounded-lg"></textarea>
                    <input type="hidden" name="id" value={params.id}/>
                    <SubmitButton />
                </form>
                <div className="flex flex-col mt-5 gap-y-3">
                    {
                        data.map(comment => (
                            <div key={comment.id}>
                                <p>{comment.message}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Comments;