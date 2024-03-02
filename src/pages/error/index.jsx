import { Button } from "antd"
import { useNavigate } from "react-router-dom"


const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <section className="flex items-center h-screen p-16 text-gray-900 bg-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page.</p>
          <p className="mt-4 mb-8 text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
          <Button type="text" onClick={() => { navigate(-1) }} className=" bg-gray-100 text-gray-900">Back to homepage</Button>
        </div>
      </div>
    </section>
  ) 
}

export default ErrorPage