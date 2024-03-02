import Regform from "@/components/form/Regform"
import Header from "../../components/Header"
export default function even () {
    return (
        <>
        <Header/>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Add event (to AXIS mongo (session/workshop)) 
            <Regform/>
        </h2>
        </main>
        </>
    )
}