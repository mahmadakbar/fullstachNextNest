import AddForm from '@components/organisms/AddForm'

export default function Home() {
  return (
    <div className="h-screen overflow-scroll">
      <h1 className="text-4xl font-bold p-5">Home</h1>

      <AddForm />
    </div>
  )
}
