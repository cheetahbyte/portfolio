import {
	SiGo,
	SiNextdotjs,
	SiPostgresql,
	SiReact,
    SiTailwindcss,
} from "@icons-pack/react-simple-icons";

export default function LocalTimeCard() {
	return (
		<section
			className={`rounded-2xl bg-[#171717] text-white/90 col-span-2 row-span-1 p-6 row-start-3 col-start-1`}
		>
			<h2 className="text-3xl mb-1">My Tech-Stack</h2>
			<div className="flex flex-row gap-2 w-full justify-between p-6">
				<SiNextdotjs size="35" />
				<SiReact size="35" />
				<SiGo size="35" />
				<SiPostgresql size="35" />
                <SiTailwindcss size="35" />
			</div>
		</section>
	);
}
