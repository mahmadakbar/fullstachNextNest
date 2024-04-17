import Menu from '@components/molecules/Menu'
import Navigation from '@components/molecules/Navigation'
import ContainerProvider from '../Provider'

export default function Container({ children }: { readonly children: React.ReactNode }) {
  return (
    <ContainerProvider>
      <section className="bg-secondary h-screen w-screen fixed">
        <div className="flex flex-row h-[92vh]">
          <Menu />
          <div className="flex-1">{children}</div>
        </div>
        <Navigation />
      </section>
    </ContainerProvider>
  )
}
