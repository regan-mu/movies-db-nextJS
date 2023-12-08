import Image from "next/image";
import Link from "next/link";

async function fetchData (id) {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
            headers: {
                accept: 'application/json',
                Authorization: process.env.MOVIEDB
            }
        }
    );
    return data.json();
}
async function Movie ({params, children}) {
    const data = await fetchData(params.id);
    return (
        <div className="min-h-screen p-10">
            <div className="h-[30vh] sm:h-[40vh] relative">
                <Image 
                    src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="movie banner" 
                    fill
                    className="object-cover rounded-lg w-full"
                />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-center pt-5">{data.title}</h1>
            <div className="flex gap-y-5 sm:gap-x-10 mt-2 sm:mt-10 flex-col sm:flex-row" >
                <div className="w-full font-medium sm:w-1/2">
                    <h1>
                        <span className="underline">Homepage:</span> <Link href={data.homepage} target="_blank">Link</Link>
                    </h1>
                    <h1>
                        <span className="underline">Original Language:</span> {data.original_language}
                    </h1>
                    <p><span className="underline">Overview:</span> {data.overview}</p>
                    <p><span className="underline">Release Date:</span> {data.release_date}</p>
                </div>
                <div className="w-full sm:w-1/2">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Movie;