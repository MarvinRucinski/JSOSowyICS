import React, { useState } from 'react';
import { FileInput, Label } from 'flowbite-react';

function IcsFileProcessor() {
    const [newLines, setNewLines] = useState([]);
    const [linkInput, setLinkInput] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.ics')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                processFile(fileContent);
            };
            reader.readAsText(file);
        }
    };

    const processFile = (fileContent) => {
        const lines = fileContent.split('\n');
        let newLines = [];
        let lineGetter = false;
        let tempLocation = [];
        let correctLocation = '';

        for (let line of lines) {
            if (line.startsWith('LOCATION')) {
                lineGetter = false;
                correctLocation = newLocation(tempLocation);
                line = correctLocation;
            }
            if (line.startsWith('DESCRIPTION')) {
                tempLocation = [];
                lineGetter = true;
            }
            if (lineGetter) {
                tempLocation += line + '\n';
            }
            newLines.push(line);
        }
        setNewLines(newLines);
    };

    const newLocation = (temp) => {
        let room = temp.match(/Sala: (.+?)\\/)[1];
        let building = temp.match(/\[(.+?)\]/)[1];
        return 'LOCATION:' + room + ' / ' + building;
    };

    const downloadNewFile = () => {
        const newContent = newLines.join('\n');
        const blob = new Blob([newContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'new.ics';
        link.click();
    };

    const fetchIcsFromLink = async () => {
        if (!linkInput) return;
        try {
            const response = await fetch(linkInput);
            if (!response.ok) throw new Error('Network response was not ok');
            const fileContent = await response.text();
            processFile(fileContent);
        } catch (error) {
            console.error('Error fetching the .ics file:', error);
        }
    };

    return (
        <div className="lg:w-1/2 lg:h-full flex flex-col items-center justify-center lg:bg-white lg:p-4 lg:border-violet-300 lg:border-2 lg:rounded-md ">
            <div className="font-bold text-sm mb-0 w-full flex flex-row items-center justify-center">
                <input type="text" className='border-2 border-violet-300 rounded-md p-1 w-full text-center' placeholder='Wklej link do pliku .ics tutaj' onChange={e => setLinkInput(e.target.value)} ></input>
                {linkInput && <button className='bg-violet-500 text-white font-bold p-1 ml-2 rounded-md hover:bg-violet-600' onClick={fetchIcsFromLink}>Wczytaj</button>}
            </div>
            <span className='text-sm text-gray-500'> lub</span>
            <div className="flex w-full items-center justify-center lg:h-2/3">
                <Label
                    htmlFor="dropzone-file"
                    className="flex h-32 w-full lg:h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-violet-300 bg-gray-50 hover:bg-gray-100"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLineJoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Naciśnij lub przeciągnij plik .ics tutaj </span>
                        </p>
                    </div>
                    <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} />
                </Label>
            </div>
            {newLines.length > 0 ? (
                <div className="bg-white border-2 border-violet-300 text-violet-400 rounded-md p-2 my-2 lg:h-1/6 lg:w-full lg:flex lg:flex-col lg:items-center lg:justify-center  lg:hover:bg-violet-500 lg:hover:text-white lg:hover:border-violet-600">
                    <button onClick={downloadNewFile} className='flex flex-row justify-center items-center w-full  font-bold text-balance'><span>👉</span><span className='underline'>Kliknij tutaj aby pobrać przeformatowany plik!</span><span>👈</span></button>
                </div>
            ) : (
                null
            )}
        </div>
    );
}

export default IcsFileProcessor;
