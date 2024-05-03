import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <section className="bg-blue-700 rounded-bl-xl rounded-br-xl text-white">
      <header>
        <h1>Incepe Calatoria Ta</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
          doloribus fugiat hic id incidunt ipsa itaque libero nam nemo nostrum
          numquam officia placeat quo recusandae, reiciendis vel veniam
          veritatis. Quo.
        </p>
      </header>
      <main>
        <Tabs>
          <TabsList>
            <TabsTrigger value="dus">Dus</TabsTrigger>
            <TabsTrigger value="intors">Intors</TabsTrigger>
          </TabsList>
          <TabsContent value={'dus'}>dus content</TabsContent>
          <TabsContent value={'intors'}>intors content</TabsContent>
        </Tabs>
      </main>
    </section>
  )
}
