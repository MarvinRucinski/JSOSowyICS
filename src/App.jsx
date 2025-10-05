import IcsFileProcessor from "./components/IcsFileProcessor"
import Info from "./components/Info"


function App() {
  return (
    <>
      <div className="flex flex-col w-full h-full justify-between lg:items-center">
        <div className="w-full">
          <div className="flex flex-row items-start absolute left-4 top-2">
            <h1 className="text-3xl font-bold text-violet-500">JSOSowy ICS</h1>
          </div>
        </div>
        <div className="flex flex-col p-4 font-body lg:flex-row lg:w-2/3 lg:justify-center lg:items-center">
          <Info />
          <IcsFileProcessor />
        </div>
        <div className="p-4 w-full flex flex-row items-center justify-center">
          <span className="text-xs">Dominik Molenda 2024 | <button onClick={() => window.location = 'mailto:molendadominik@outlook.com'}>Kontakt</button></span>
        </div>
      </div>
    </>
  )
}

export default App
