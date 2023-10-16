import Image from "next/image";
import FileUpload from "./components/FileUpload";

export default function Home() {
	return (
		<main className="bg-[#FEF4EE]  flex min-h-screen w-full flex-col items-center justify-between p-24">
			<FileUpload />
		</main>
	);
}
