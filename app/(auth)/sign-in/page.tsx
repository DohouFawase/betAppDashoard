import LoginCompo from "./_components/Logincompo";

export default function page() {
    return (
        <>
       <div className="grid grid-cols-2  px-24  w-full gap-6 items-center shadow py-4">
       <div className="bg-[url('/cover.jpg')] min-h-screen bg-cover bg-no-repeat  px-8  py-4 w-full text-white flex flex-col justify-between ">
    <div className="">1</div>
    <div className="">1</div>

</div>
        <div className="">
            <LoginCompo />
        </div>
       </div>
        
        </>
    )
}