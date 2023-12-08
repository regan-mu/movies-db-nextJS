import Link from "next/link";
import Image from "next/image";
async function fetchData() {
  const data = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: 'application/json',
        Authorization: process.env.MOVIEDB
      },
      next: {
        revalidate: 10
      }
    }
  )
  return data.json();
}

export default async function Home() {
  const data = await fetchData();
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-15">
          <h2 className="mb-4 text-center text-2xl md:mb-6 lg:text-3xl font-bold text-gray-800">Top Trending Movies</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {data.results.map(movie => (
              <div key={movie.id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
                <Link 
                  className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64" 
                  href={`movie/${movie.id}`}
                  prefetch
                >
                  <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="image movie banner" 
                    className="absolute inset-0 h-full w-full object-cover 
                    object-center transition duration-200 group-hover:scale-110" width={500} height={500} 
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    <Link className="transition duration-200 hover:text-teal-500 active:text-teal-600" href={`movie/${movie.id}`}>{movie.title}</Link>
                  </h2>
                  <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
