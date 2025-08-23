export default function ProfileImageCard() {
    return <section
		className={`rounded-2xl bg-[#171717] text-white/90 col-span-1 md:col-span-1 row-span-1 p-0 overflow-hidden`}
	>
        <div className="h-full w-full bg-[url('/output.jpg')] bg-cover bg-center" />
	</section>
}