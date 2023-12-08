"use client";
import {useFormStatus} from "react-dom";

export default function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} type="submit" className="bg-teal-500 px-4 py-2 text-white rounded-lg">
            {pending ? <>Loading...</>: <>Add Comment</>}
        </button>
    )
}