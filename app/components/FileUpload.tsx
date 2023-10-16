"use client";
// FileUpload.tsx
import React, { useState } from "react";
import fundAndUploadNestedBundle from "../utils/fundAndUploadNestedBundle";

const FileUpload: React.FC = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [tags, setTags] = useState<{ name: string; value: string }[][]>(
		new Array(3).fill(null).map(() => [{ name: "", value: "" }]),
	);
	const [message, setMessage] = useState<string>("");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (e.target.files) {
			const newFiles = [...files];
			newFiles[index] = e.target.files[0];
			setFiles(newFiles);
		}
	};

	const handleTagChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		outerIndex: number,
		innerIndex: number,
		field: "name" | "value",
	) => {
		const newTags = JSON.parse(JSON.stringify(tags)); // Deep copy to avoid reference issues
		newTags[outerIndex][innerIndex][field] = e.target.value;
		setTags(newTags);
	};

	const doUpload = async () => {
		const [manifestId, receiptId] = await fundAndUploadNestedBundle(files, tags);
		setMessage("files uploaded");
		console.log("files=", files);
		console.log("tags=", tags);
		for (let i = 0; i < files.length; i++) {
			console.log(`File ${i + 1} URL https://gateway.irys.xyz/${manifestId}/${files[i].name}`);
		}
	};

	return (
		<div className="bg-[#FEF4EE] min-h-screen flex items-center justify-center">
			<div className="text-black">
				{Array.from({ length: 3 }, (_, outerIndex) => (
					<div key={outerIndex} className="my-4">
						<input
							type="file"
							className="border rounded hover:opacity-80 transition-opacity duration-500 px-1 py-1"
							onChange={(e) => handleFileChange(e, outerIndex)}
						/>
						{tags[outerIndex].map((_, innerIndex) => (
							<div key={innerIndex} className="inline-block ml-2">
								<input
									type="text"
									className="border rounded hover:opacity-80 transition-opacity duration-500 px-1 py-1"
									placeholder="Tag Name"
									onChange={(e) => handleTagChange(e, outerIndex, innerIndex, "name")}
								/>
								<input
									type="text"
									className="border rounded hover:opacity-80 transition-opacity duration-500 ml-2 px-1 py-1"
									placeholder="Tag Value"
									onChange={(e) => handleTagChange(e, outerIndex, innerIndex, "value")}
								/>
							</div>
						))}
					</div>
				))}
				<button
					className="bg-black text-white rounded px-4 py-2 hover:opacity-80 transition-opacity duration-500"
					onClick={doUpload}
				>
					Upload
				</button>
				{message && <div className="mt-4 text-xl">{message}</div>}
			</div>
		</div>
	);
};

export default FileUpload;
