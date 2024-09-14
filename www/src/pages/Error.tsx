const NotFound = () => {

    return (
      <>
        <main className="grid h-screen w-screen place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8 bottom-animation">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-400">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-200">Trying to out secret the secret network?</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a target="_blank" href="https://www.youtube.com/watch?v=q-Y0bnx6Ndw" className="text-sm font-semibold text-white">
                Secret? <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }

  export default NotFound
  